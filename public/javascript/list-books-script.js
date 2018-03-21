$(document).ready( () => {
    $.get('/books').then(renderBook);

    function renderBook(books) {
        let template = $('#bookTemplate').html();
        let resultsHTML = books.map( (book) => {
            return template.replace(':bookName:', book.title).replace(':id:', book.id);
        }).join('');
        $('#list-book').html(resultsHTML);
    }

    $('#keyword').change( () => {
        $.get('/search-basic', {
            keyword: $('#keyword').val()
        }).then(renderBook);
    });

    $('#search-advance').click( () =>{
        $.get('/search-advance', {
            title: $('#input-title-search').val(),
            author: $('#input-author-search').val(),
            publisher: $('#input-publisher-search').val()
        }).then(renderBook);
    });

    $('#search').click( () => {
        $('#advance').toggle();
    });
    /*--------------------------------------------------------------------------------------*/

    function renderPublishers(publishers) {
        let template = $('#publisherTemplate').html();
        let resultsHTML = publishers.map( (publisher) => {
            return template.replace(':publisher.name:', publisher.name).replace(':publisher.id:', publisher.id);
        }).join('');
        $('#list-publisher').html(resultsHTML);
    }

    $.get('/create').then(renderPublishers);

});
