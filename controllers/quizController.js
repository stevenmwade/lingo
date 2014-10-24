var Languages = require('../models/languages.js');

var quizController = {
	addQuiz: function(req, res){
		var user = req.user;
		var name = req.body.name;
		var newQuiz = {
			name: name
		};
		user.quizzes.push(newQuiz);
		user.save(function(err, result){
			// console.log('New quiz ', newQuiz);

			res.send(result.quizzes[result.quizzes.length -1]);
		});
	},

	getQuizzes: function(req, res){
		console.log('Get music user quizzes: ', req.user.quizzes);
		res.send(req.user.quizzes);
	},
	createQuiz: function(req, res){
		res.render('createQuiz', {
			languages: Languages.getLanguages(),
			id: req.params.id
		});
		// res.send(req.user.quizzes);
	},
	addToQuiz: function(req, res){
		var q = req.body.q;
		var a = req.body.a;
		var id = req.body.id;
		var addPair = {
			q: q,
			a: a
		};
		req.user.quizzes.id(id).quiz.push(addPair);
		req.user.save();
		res.send('Word Added!');
	}

};

module.exports = quizController;