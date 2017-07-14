var http = require("http"),
	fs = require("fs");

/* Forma Sincrona */
//var html = fs.readFileSync("./index.html");

/* Forma Asincrona */
http.createServer(function(request, response){
	fs.readFile("./index.html", function(err,html){
		response.writeHead(200,{
  			//'Content-Type': 'text/html' 
  			'Content-Type': 'application/json' 
		});
		//response.write(html);
		response.write(JSON.stringify({nombre:"Cristobal", username: "CristScript"}));
		response.end();
	});
}).listen(8080);

// curl -I localhost:8080 Prueba de encabezado