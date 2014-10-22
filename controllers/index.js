var Languages = require('../models/languages.js');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	translate: function(req, res){
		res.render('translate', {
			languages: Languages.getLanguages()
		});
	},
	quiz: function(req, res){
		res.render('quiz');
	},
	progress: function(req, res){
		res.render('progress');
	},
	login: function(req, res){
		passport.use(new LocalStrategy(
		  function(username, password, done) {
		    User.findOne({ username: username }, function (err, user) {
		      if (err) { return done(err); }
		      if (!user) {
		        return done(null, false, { message: 'Incorrect username.' });
		      }
		      if (!user.validPassword(password)) {
		        return done(null, false, { message: 'Incorrect password.' });
		      }
		      return done(null, user);
		    });
		  }
		));
	}
};

module.exports = indexController;