var renderQuiz = function(quizData){
	var el = $('<div>');

	// Set an attribute on the main containing li that will let us
	// access the track's specific database ID
	el.attr('data-id', quizData._id);

	el.append('<h3><a>'+ quizData.name +'</a></h4>');
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

	$.get('/quizzes/getQuizzes', {}, function(responseData){
		for (var i = 0; i < responseData.length; i++) {
			var trackEl = renderQuiz(responseData[i]);
			$('.display-quizzes').append(trackEl);
		};
		console.log('Get quiz, responses: ', responseData);
	});

	$(document).on('click', '.add-quiz', function(event) {
		$('#quiz-name-input').toggle('slide', {direction: 'left'});
		$(this).removeClass('add-quiz').addClass('submit-quiz');
		$(this).text('Add');
	});

	$(document).on('click', '.submit-quiz', function(event) {
		var name = $('#quiz-name-input').val();
		console.log('Name: ', name);
		$.post('/quizzes/addQuiz', {name: name}, function(responseData){
			var trackEl = renderQuiz(responseData);
			$('.display-quizzes').append(trackEl);
		});
		
	});

});