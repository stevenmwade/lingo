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
		
	}

};

module.exports = quizController;