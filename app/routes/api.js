var User = require('../models/user' );
var jwt  = require('jsonwebtoken');
var secret = 'harrypotter';

module.exports= function(router){


	router.post('/users', function(req,res) {
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	user.name = req.body.name;

	if(req.body.name == null || req.body.name == "" || req.body.username == null || req.body.username == "" || req.body.password == null || req.body.password == "" ||req.body.email == null || req.body.email == "")
		{
				res.json({success: false, message: "Ensure username, email and password"});
		}else{
			user.save(function (err) {
				if(err) {
                    
                    if (err.errors != null) {
                        if (err.errors.name) {
                            res.json({ success: false, message: err.errors.name.message }); 
                        } else if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message }); 
                        } else if (err.errors.username) {
                            res.json({ success: false, message: err.errors.username.message }); 
                        } else if (err.errors.password) {
                            res.json({ success: false, message: err.errors.password.message });
                        } else {
                            res.json({ success: false, message: err });
                        }
                    } else if (err) {
                        if (err.code == 11000) {
                            if (err.errmsg[61] == "u") {
                                res.json({ success: false, message: 'That username is already taken' }); 
                            } else if (err.errmsg[61] == "e") {
                                res.json({ success: false, message: 'That e-mail is already taken' }); 
                            }
                        } else {
                            res.json({ success: false, message: err }); 
                        }
                    }
                } else {

                }
			});
		}
	});

	


	router.post('/authenticate',function(req,res){
		User.findOne({username: req.body.username}).select('email nor found').exec(function(err,user){

			if (err) throw err;

			if(!user){
				res.json({success: false, message: 'could not authenticate user'});
			} else if(user){
					if (req.body.password){
						var validPassword = user.comparePassword(req.body.password);
					}else{
						res.json({success:true, message: 'No password'});
					}


					if (!validPassword)
						res.json({success: false, message: 'Could not authnticate password'})

			} else {
				var token = jwt.sign({ username: user.username, email: user.email}, secret, {expiresIn: '24h'});
				res.json({success: true, message: 'User authenticated', token: token});  
			}


		});
	});


	router.use(function(req, res, next) {
		var token = req.body.token || req.body.query || req.headers['x-access-token'];

		if(token){
			jwt.verify(token, secret, function(err, decode) {
				if(err) {
					res.json({success: false, message: "toke failed"});
				}else{

					req.decoded =decoded;
					next();
				}
			});
		}else {
			res.json({success:false, message: 'No token found'});
		}

	});

	router.post('/me', function(req,res){
		res.send('testing me router');
	});



	
	return router;
}