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


});