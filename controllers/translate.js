var BeGlobal = require('node-beglobal');
var Languages = require('../models/languages.js');

var beglobal = new BeGlobal.BeglobalAPI({
  api_token: 'mh89nSy1B6Rn6JKzgs5Kwg%3D%3D'
});

var translateController = {
	getTranslation: function(req, res){
		var languages = Languages.getLanguages();
		var findCode = function(name) {
			for (var i = 0; i < languages.length; i++) {
				if (languages[i].name === name) {
					return languages[i].code;
				}
			}
		};
		// Find codes for params
		var text = req.body.text;
		var from = findCode(req.body.from);
		var to = findCode(req.body.to);
		
		// Translation
		beglobal.translations.translate(
		  {text: text, from: from, to: to},
		  function(err, results) {
		    if (err) {
		      return console.log(err);
		    }
		    res.redirect('/translate');
		    console.log('Translate results:', results);
		  }
		);
		// res.send(req.body);
	}
};

module.exports = translateController;