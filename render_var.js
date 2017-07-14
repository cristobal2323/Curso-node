var http = require("http"),
	fs = require("fs");

http.createServer(function(request, response){
	fs.readFile("./index.html", function(err,html){

		var html_string = html.toString();
		var variables = html_string.match(/[^\{\}]+(?=\})/g);
		var nombre = "Cristóbal";

		for (var i = variables.length - 1; i >= 0; i--) {
			var value = eval(variables[i]);
			html_string = html_string.replace("{"+variables[i]+"}",value);
		}

		response.writeHead(200,{'Content-Type': 'text/html' });
		response.write(html_string);
		response.end();
	});
}).listen(8080);

