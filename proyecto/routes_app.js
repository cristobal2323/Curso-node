var express = require("express");
var router = express.Router();
var Imagen = require("./models/imagenes");

var image_finder_middleware = require("./middlewares/find_image");

router.get("/", function(req,res){
	res.render("app/home")
})

router.all("/imagenes/:id*",image_finder_middleware);


router.get("/imagenes-new", function(req,res){
	res.render("app/imagenes/new")
})

router.get("/imagenes/:id/edit", function(req,res){
	res.render("app/imagenes/edit")
})


router.route("/imagenes/:id")
	.get((req,res)=>{
		res.render("app/imagenes/show")
		
	})
	.put((req,res)=>{
		res.locals.imagen.title = req.body.title;		
		res.locals.imagen.save().then((us)=>{
			res.render("app/imagenes/show")
		},(err)=>{
			if(err){
				console.log(err)
				res.redirect("/app/imagenes/"+req.params.id+"/edit");
			}
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
		Imagen.find({creator:res.locals.user._id},(err,imagenes)=>{
			if(err){res.redirect("/app"); return;}
			res.render("app/imagenes/index",{imagenes: imagenes})
		})
	})
	.post((req,res)=>{
		console.log(res.locals.user._id)
		var data = {
			title: req.body.title,
			creator : res.locals.user._id
		};

		var imagen = new Imagen(data);
		console.log(imagen)
		imagen.save().then((us)=>{
			res.redirect("/app/imagenes/"+imagen._id);
		},(err)=>{
			if(err){
				console.log(imagen)
				console.log(err)
				//res.render(err);
			}
		})
	})

/* REST */

module.exports = router;