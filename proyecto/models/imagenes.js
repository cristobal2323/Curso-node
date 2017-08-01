var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/foto', { useMongoClient: true });

var img_schema = new Schema({
	title : {type:String, required:true}
});

var Imagen = mongoose.model("Imagen",img_schema);

module.exports = Imagen;