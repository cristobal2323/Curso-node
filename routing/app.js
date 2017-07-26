var express = require("express");
var app = express();

app.set('view engine', 'pug')

app.get('/', function (req, res) {
 	res.render('index', { title: 'Hola', message: 'Hello there!' })
})

app.get('/:nombre', function (req, res) {
	console.log(req.params.nombre)
 	res.render("form", { nombre: req.params.nombre})
})

app.post("/",function(req,res){
	res.render("form")
})

app.listen(8080);