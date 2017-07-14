var http = require("http");

var manejador = function(request, response){
	console.log("hola mundo");
	response.end();
};

var servidor = http.createServer(manejador);
servidor.listen(9097);