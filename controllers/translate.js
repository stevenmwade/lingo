var BeGlobal = require('node-beglobal');
var Languages = require('../models/languages.js');
var Keys = require('../keys.js');

var beglobal = new BeGlobal.BeglobalAPI({
  api_token: Keys.BEGLOBAL_KEY
});

var translateController = {
	getTranslation: function(req, res){
		var languages = Languages.getLanguages();
		// var findCode = function(name) {
		// 	for (var i = 0; i < languages.length; i++) {
		// 		if (languages[i].name === name) {
		// 			return languages[i].code;
		// 		}
		// 	}
		// };

		console.log(req.body);
		var text = req.body.text;
		var from = req.body.from;
		var to = req.body.to;
		
		// Translation
		beglobal.translations.translate(
		  {text: text, from: from, to: to},
		  function(err, results) {
		    if (err) {
		      return console.log(err);
		    }
		    res.send(results.translation);
		    console.log('Translate results:', results);
		  }
		);
		// res.send(req.body);
	}
};

module.exports = translateController;