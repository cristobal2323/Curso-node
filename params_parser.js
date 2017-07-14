function parse(request){
	var arreglo_parametros = [], parametros = {};

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
	return parametros;
}

module.exports.parse = parse;