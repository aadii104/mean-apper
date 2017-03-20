var express = require('express');
var app = express();
var port = process.env.PORT || 3000; 
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
var passport = require('passport');
var social = require('./app/passport/passport')(app, passport);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

mongoose.connect('mongodb://localhost:27017/apper', function (err) {
	if (err){
		console.log('not connnectd to db coz :' + err);

	}else{
		console.log('Sucessfully connnected to db');
	}
});



app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/ndex.html'));
})
app.listen(port ,function() {
	console.log('Running the server on port ' + port);
});