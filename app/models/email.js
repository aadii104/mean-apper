 var mongoose 		= require('mongoose');
 var Schema   		= mongoose.Schema;


 var EmailSchema    = new Schema({
 	sub_name:       {type: String, required:true},
 	sub_Email:      {type: String, required:true},
 	sub_msg:        {type: String, required:true}

 });





 module.exports   = mongoose.model('Emails', EmailSchema);
 // module.exports   = mongoose.model('User', UserSchema);