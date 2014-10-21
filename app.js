var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var indexController = require('./controllers/index.js');

mongoose.connect('mongodb://localhost/lingo');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);
app.get('/translate', indexController.translate);
app.get('/quiz', indexController.quiz);
app.get('/progress', indexController.progress);

var server = app.listen(9063, function() {
	console.log('Express server listening on port ' + server.address().port);
});
