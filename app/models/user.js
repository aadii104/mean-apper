var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');


var nameValidator = [
	validate({
		validator: "matches",
		arguments: /^(([a-zA-Z]{3,10})+[ ]+([a-zA-Z]{3,10})+)+$/,
		message: "name must be 3-10, witout special char"
	}),
	validate({
		validator: "isLength",
		arguments: [3,10],
		message: "name should be letter & no"
	})
];
var emailValidator = [
	validate({
		validator: "isEmail",
		message: "email should be email :)"
	}),
	validate({
		validator: "isLength",
		arguments: [3,25],
		message: "Email should be between chars"
	})

];
var usernameValidator = [
	validate({
		validator: "isLength",
		arguments: [3,25],
		message: "username should be between chars"
	}),
	validate({
		validator: "isAlphanumeric",
		arguments: [3,25],
		message: "username should be letter & no"
	})
];
var passwordValidator = [
	validate({
		validator: "matches",
		arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\w]).(8,35)$/,
		message: "password must be 3-10, witout special char"
	}),
	validate({
		validator: "isLength",
		arguments: [3,25],
		message: "password should be 3025"
	})
];


var UserSchema= new Schema({
	name: {type: String,  required: true, validate: nameValidator},
	username: {type: String, lowercase:true, required:true,unique: true, validate: usernameValidator},
	password: {type: String, required:true ,validate:passwordValidatorselect: false},
	email: {type: String, required:true,lowercase:true, unique: true, validate: emailValidator},
	active: {type: Boolean, required;true, default: false},
	temporarytoken: {type: String, required:true}
});

UserSchema.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.password, null, null, function(err,hash){
		if(err) return next(err);
		user.password = hash;
		next();
	})
});
UserSchema.plugin(titlize, {
	paths: ['name']
});


UserSchema.method.comparePassword = function(password){
	return bcrpyt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);