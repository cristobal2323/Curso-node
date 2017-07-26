var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/foto', { useMongoClient: true });

var userSchema = new Schema({
	name :String,
	username:String,
	password: String,
	age: Number,
	email: String,
	date_of_birth: Date
});

var User = mongoose.model("User",userSchema);

module.exports.User = User;