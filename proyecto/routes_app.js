var express = require("express");
var router = express.Router();
var Imagen = require("./models/imagenes");

router.get("/", function(req,res){
	res.render("app/home")
})


router.get("/imagenes/new", function(req,res){
	res.render("app/imagenes/new")
})

router.get("/imagenes/:id/edit", function(req,res){

})


router.route("/imagenes/:id")
	.get((req,res)=>{
		Imagen.findById(req.params.id,(err,imagen)=>{
			res.render("app/imagenes/show",{imagen:imagen})
		})
	})
	.put((req,res)=>{

	})
	.delete((req,res)=>{

	})

router.route("/imagenes")
	.get((req,res)=>{

	})
	.post((req,res)=>{
		var data = {
			title: req.body.title
		};

		var imagen = new Imagen(data);
		console.log(imagen)
		imagen.save().then((us)=>{
			res.redirect("/app/imagenes/"+imagen._id);
		},(err)=>{
			if(err){
				console.log(err)
				//res.render(err);
			}
		})
	})

/* REST */

module.exports = router;