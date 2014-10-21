var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	translate: function(req, res){
		res.render('translate');
	},
	quiz: function(req, res){
		res.render('quiz');
	},
	progress: function(req, res){
		res.render('progress');
	}
};

module.exports = indexController;