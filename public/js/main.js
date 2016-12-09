$(document).ready(function(){
	$('.delete-reports').on('click', function(){
		var id = $(this).data('id');
		var url = '/delete/' + id;
		if(confirm('Delete this?')){
			$.ajax({
				url: url,
				type: 'DELETE',
				success: function(result){
					console.log('Deleting');
					window.location.href='/';
				},
				error: function(err){
					console.log(err);
				}

			});

		}
	});

	$('.edit-reports').on('click', function(){
		$('#edit-form-street').val($(this).data('street'));
		$('#edit-form-numbercar').val($(this).data('numbercar'));
		$('#edit-form-description').val($(this).data('description'));
		$('#edit-form-id').val($(this).data('id'));

	});
});