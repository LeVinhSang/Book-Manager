$(document).ready( () => {
    $('#edit').click( () => {
        $('#edit-book').toggle();
    });

    $('#delete').click( () => {
        $.ajax({
            url: '/book',
            type: 'delete',
            data: {
                id:$('#id').val()
            }
        }).then(alert);
    });
});