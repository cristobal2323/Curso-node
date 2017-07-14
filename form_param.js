var http = require("http"),
	fs = require("fs");

http.createServer(function(request, response){

	if(request.url.indexOf("favicon.ico") > 0 ){return;}

	fs.readFile("./index.html", function(err,html){
		var html_string = html.toString();
		var variables = html_string.match(/[^\{\}]+(?=\})/g);
		var arreglo_parametros = [];
		var nombre = "";
		var parametros =[];

		if(request.url.indexOf("?") > 0 ){
			var url_data = request.url.split("?");
			var arreglo_parametros = url_data[1].split("&");
		}

		for (var i = arreglo_parametros.length - 1; i >= 0; i--) {
			var parametro = arreglo_parametros[i]
			var param_data = parametro.split("=");
			console.log(parametros[param_data[0]]);
			parametros[param_data[0]] = param_data[1];
		}

		for (var i = variables.length - 1; i >= 0; i--) {
			var variable = variables[i];
			console.log(variable)
			html_string = html_string.replace("{"+variables[i]+"}",parametros[variable]);
		}

		response.writeHead(200,{'Content-Type': 'text/html' });
		response.write(html_string);
		response.end();
	});
}).listen(8080);

