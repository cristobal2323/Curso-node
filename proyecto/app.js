var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

// mongoose.connect("mongodb://localhost/foto", function(err, db) {
//     if (err) {
//         console.log('Unable to connect to the server. Please start the server. Error:', err);
//     } else {
//         console.log('Connected to Server successfully!');
//     }
// });

mongoose.connect('mongodb://localhost/foto', { useMongoClient: true })

var userSchema = new Schema({
	email :String,
	password:String
});

let User = mongoose.model('user', userSchema);

app.set('view engine', 'pug');

app.use("/public", express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
 	res.render('index');
})

app.get('/login', function (req, res) {
 	res.render('login');
})

app.post("/users", function(req, res, next){
	let user = new User();

	  user.email = req.body.email;
	  user.password= req.body.password;

  user.save((err, user) => {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(user);
      res.send(user);
    }
  })
})

app.listen(8080);