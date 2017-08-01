var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var cookieSession = require("cookie-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session");
var app = express();

app.set('view engine', 'pug');

app.use("/public", express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(session({
// 	secret: "2918739182u3n",
// 	resave: false,
// 	saveUninitialized: false
// }));

app.use(cookieSession({
	name:"session",
	keys:["llave-1","llave-2"]
}));

app.get('/', function (req, res) {
	console.log(req.session.user_id);
 	res.render('index');
})

app.get('/login', function (req, res) {
	res.render('login');
})

app.get('/signup', function (req, res) {
	User.find((err,doc)=>{
		console.log(doc)
		res.render('signup');
	})
})

app.post("/users", function(req, res, next){
	let user = new User();

	user.email = req.body.email;
	user.password= req.body.password;
	user.username= req.body.username;
	user.password_confirmation = req.body.password_confirmation;

	console.log(user.password_confirmation);

	user.save().then((us)=>{
		res.send("guardamos el usuario exitosamente");
	},(err)=>{
		if(err){
			console.log(err);
			res.send("no pudimos envíar la información");
		}
	})
})

app.post("/sessions", function(req, res, next){
	User.findOne({email:req.body.email,password:req.body.password},(err,user)=>{
		req.session.user_id = user._id;
		res.redirect("/app");
	})
})

app.use("/app",session_middleware);
app.use("/app",router_app);

app.listen(8080);