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
	Imagen.findById(req.params.id,(err,imagen)=>{
		res.render("app/imagenes/edit",{imagen:imagen})
	})
})


router.route("/imagenes/:id")
	.get((req,res)=>{
		Imagen.findById(req.params.id,(err,imagen)=>{
			res.render("app/imagenes/show",{imagen:imagen})
		})
	})
	.put((req,res)=>{
		Imagen.findById(req.params.id,(err,imagen)=>{
			imagen.title = req.body.title;
			
			imagen.save().then((us)=>{
				res.render("app/imagenes/show",{imagen:imagen})
			},(err)=>{
				if(err){
					console.log(err)
					res.redirect("/app/imagenes/"+imagen._id+"/edit",{imagen:imagen});
				}
			})
			
		})
	})
	.delete((req,res)=>{
		Imagen.findOneAndRemove({_id:req.params.id},(err)=>{
			if(!err){
				res.redirect("/app/imagenes/");
			}else{
				console.log(err);
				res.redirect("/app/imagenes/"+req.params.id);
			}
		})
	})

router.route("/imagenes")
	.get((req,res)=>{
		Imagen.find({},(err,imagenes)=>{
			if(err){res.redirect("/app"); return;}
			res.render("app/imagenes/index",{imagenes: imagenes})
		})
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