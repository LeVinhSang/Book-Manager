/*
$(document).ready( () => {
    function feature(url, method, data) {
        return $.ajax({
            url : url,
            type: method,
            data: data,
            content: 'Application/json'
        })
    }

    feature('/books', 'get').then(value => getBookHTML(value));

    $('#search-basic').click( () => {
        feature('/search-basic', 'get', {
            keyword: $('#keyword').val()
        }).then(value => getBookHTML(value));
    });

    feature('/create', 'get').then(value => getPublishersHTML(value));

    $('#search-advance').click( () => {
        feature('/search-advance', 'get', {
            title: $('#input-title-search').val(),
            author: $('#input-author-search').val(),
            publisher: $('#input-publisher-search').val()
        }).then(value => getBookHTML(value));
    });

    function getBookHTML(books) {
        $('#title').html('');
        books.forEach( (element) => {
            $('#title').append( "<ul><li><a href='/book/"+element.id+"'>"+element.title+"</a></li></ul>");
        });
    }

    function getPublishersHTML(books) {
        $('#publisher').html('');
        books.forEach( (element) => {
            $('#publisher').append("<option value='"+element.id+"'>"+element.name+"</option>");
        });
    }


    $('#create').click( () => {
        $('#add-book').toggle();
    });

    $('#search').click( () => {
        $('#advance').toggle();
    });

    $('#create-book').click( () => {
        feature('/book', 'post', {
            title: $('#input-title-create').val(),
            author: $('#input-author-create').val(),
            publisher_id: $('#input-publisher-create').val(),
            price: $('#input-price-create').val()
        }).then( value => {
            alert(value);
            $('#add-book').hide();
        });
    });

});*/

$(document).ready( () => {
    $.get('/books').then(renderBook);

    function renderBook(books) {
        let template = $('#bookTemplate').html();
        let resultsHTML = books.map( (book) => {
            return template.replace(':bookName:', book.title).replace(':id:', book.id);
        }).join('');
        $('#list-book').html(resultsHTML);
    }

    $('#search-basic').click( () => {
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

    $('#create').click( () => {
        $('#add-book').toggle();
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
