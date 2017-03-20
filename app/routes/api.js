var Email      		= require('../models/email');
var nodemailer		= require('nodemailer');

module.exports = function(router){

	router.post('/emails',function(req,res) {

	var transporter		=	nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'sharmaadi104@gmail.com',
			pass: 'adiaskaditya'
		}
	});	
	var email = new Email();
	email.sub_name 		=   req.body.sub_name;
	email.sub_Email 	=   req.body.sub_Email;
	email.sub_msg		=	req.body.sub_msg;
	if(req.body.sub_name == null || req.body.sub_name == "" || req.body.sub_Email == null ||
	 req.body.sub_Email == ""|| req.body.sub_msg == null || req.body.sub_msg == ""){ 
			res.json({success:false, message:'ensure usernum or password is there!!!'})
	}else{
		email.save(function (err) {
			var mailOptions = {
				// from: email.sub_Email,
				to: "sharmaadi104@gmail.com",
				subject: "constumer enq",
				html: "<b>Aerodite</b><br> Mr." + req.body.sub_name + " wants to know <br>" + req.body.sub_msg + " By the way his mail add is <br>" + req.body.sub_Email
			};
			transporter.sendMail(mailOptions,function (err,info) {
					if(error){	return console.log(error);	}
					console.log("message %s sent: %s", info.message,info.response);
					res.send();
			});
			res.json({success:true,message:'user created'});
		
	});
	}
});
	return router;
}