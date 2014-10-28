var renderQuiz = function(quizData){
	var el = $('<div>');

	// Set an attribute on the main containing li that will let us
	// access the track's specific database ID
	el.attr('data-id', quizData._id);
	el.attr('class', 'each-quiz');

	el.append('<h3><a href="/quiz/' +
		quizData._id +
		'" class="quiz-link">' +
		quizData.name +
		'</a></h4>');
	return el;
};
var renderQuizWords = function(quizData){
	var el = $('<div>');
	el.attr('class', 'row');
	el.append( '<div class="col-xs-4 question">'+quizData.q+'</div>' +
		'<div class="col-xs-4"><i class="fa fa-arrows-h"></i></div>' +
		'<div class="col-xs-4 answer">'+quizData.a+'</div>'
	);
	return el;
};

$(document).ready(function() {
	
	$('#translation').on('submit', function(event) {
		event.preventDefault();
		console.log('Form submitting!');
		var from = $(this).find('[name=from]').val();
		var to = $(this).find('[name=to]').val();
		var text = $(this).find('[name=text]').val();
		var translationData = {
			from: from,
			to: to,
			text: text
		};
		console.log('Translation data: ', translationData);

		$.post('/getTranslation', translationData, function(responseData){
			console.log('Response: ', responseData);
			$('.translated-text').val(responseData);
		});
	});
	$('.translate-word').on('click', function(event) {
		event.preventDefault();
		console.log('Form submitting!');
		console.log('This', $(this));
		var from = $(this).closest('#createQuiz').find('[name=from]').val();
		var to = $(this).closest('#createQuiz').find('[name=to]').val();
		var text = $(this).closest('#createQuiz').find('[name=q]').val();
		var translationData = {
			from: from,
			to: to,
			text: text
		};
		console.log('Translation data: ', translationData);

		$.post('/getTranslation', translationData, function(responseData){
			console.log('Response: ', responseData);
			$('.translated-text').val(responseData);
		});
	});

	$.get('/quizzes/getWords', {}, function(responseData){
		console.log('Get words response: ', responseData);
		for (var i = 0; i < responseData.length; i++) {
			var quizWords = renderQuizWords(responseData[i]);
			$('#quiz-words').append(quizWords);
		}
	});

	$.get('/quizzes/getQuizzes', {}, function(responseData){
		for (var i = 0; i < responseData.length; i++) {
			var quizEl = renderQuiz(responseData[i]);
			$('.display-quizzes').append(quizEl);
		};
		// console.log('Get quiz, responses: ', responseData);
	});

	$(document).on('click', '.add-quiz', function(event) {
		$('#quiz-name-input').toggle('slide', {direction: 'left'});
		$(this).removeClass('add-quiz').addClass('submit-quiz');
		$(this).text('Add');
	});

	$(document).on('click', '.submit-quiz', function(event) {
		var name = $('#quiz-name-input').val();
		console.log('Name: ', name);
		$('#quiz-name-input').val('');
		$.post('/quizzes/addQuiz', {name: name}, function(responseData){
			var quizEl = renderQuiz(responseData);
			console.log('Submit response: ', responseData);
			console.log('Quiz element: ', quizEl);
			$('.display-quizzes').append(quizEl);
		});
	});

	$('#createQuiz').on('submit', function(event) {
		event.preventDefault();
		var q = $(this).find('[name=q]').val();
		var a = $(this).find('[name=a]').val();
		var id = $(this).find('[name=id]').val();

		var addPair = {
			q: q,
			a: a,
			id: id
		};

		$.post('/quiz/addToQuiz', addPair, function(responseData){
			console.log("Add to quiz response: ", responseData);
		});
	});



});





















