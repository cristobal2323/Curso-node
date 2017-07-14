var http = require("http"),
	fs = require("fs"),
	parser = require("./params_parser.js"),
	render = require("./render_view.js");

var p = parser.parse;
var render = render.render;

http.createServer(function(request, response){

	if(request.url.indexOf("favicon.ico") > 0 ){return;}

	fs.readFile("./index.html", function(err,html){
		var html_string = html.toString();
		var variables = html_string.match(/[^\{\}]+(?=\})/g);
		var nombre = "";
		var parametros = p(request);

		response.writeHead(200,{'Content-Type': 'text/html' });
		response.write(render(html_string,variables,parametros));

		response.end();
	});
}).listen(8080);

