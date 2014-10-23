var quizController = {
	addQuiz: function(req, res){
		var user = req.user;
		var name = req.body.name;
		user.quizzes.push({
			name: name
		});
		user.save();
	},

	getQuizzes: function(req, res){
		console.log('Get music user quizzes: ', req.user.quizzes);
		res.send(req.user.quizzes);
	}
};

module.exports = quizController;