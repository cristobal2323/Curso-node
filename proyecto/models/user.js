var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/foto', { useMongoClient: true });

var posible_valores = ["M","F"];
var email_match = [/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,"Coloca un email válido"];
var password_validation = {
				validator: function(p){
					return this.password_confirmation == p;
				},
				message: "La Contraseña no son iguales"
			};

var userSchema = new Schema({
	name :String,
	last_name: String,
	username:{type: String, required: true, maxlength: [50, "Username muy grande"]},
	password: {type: String, minlength: [5, "Password es muy corto"],validate: password_validation},
	age: {type: Number, min: [5, "La edad no puede ser menor que 5"], max: [100, "La edad no puede ser mayor que 100"]},
	email: {type: String, required: "El correo es obligatorio", match:email_match},
	date_of_birth: Date,
	sex: {type:String, enum:{values: posible_valores, message: "Opción no válida"}}
});


userSchema.virtual("password_confirmation").get(()=>{
	return this.p_c;
}).set((password)=>{
	this.p_c = password;
});

var User = mongoose.model("User",userSchema);

module.exports.User = User;