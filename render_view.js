function render(html_string, variables,parametros){
	for (var i = variables.length - 1; i >= 0; i--) {
			var variable = variables[i];
			console.log(variable)
			html_string = html_string.replace("{"+variables[i]+"}",parametros[variable]);
		}
	return html_string;
}

module.exports.render = render;