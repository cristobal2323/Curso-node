var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var app = express();

app.set('view engine', 'pug');

app.use("/public", express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
 	res.render('index');
})

app.get('/login', function (req, res) {
	User.find((err,doc)=>{
		console.log(doc)
		res.render('login');
	})
})

app.post("/users", function(req, res, next){
	let user = new User();

	  user.email = req.body.email;
	  user.password= req.body.password;
	  user.password_confirmation = req.body.password_confirmation;

	  console.log(user.password_confirmation);

	  user.save((err, user) => {
	    if(err) {
	      console.log(err);
	    } else {
	      console.log(user);
	      res.send("Estamos");
	    }
	  })
})

app.listen(8080);