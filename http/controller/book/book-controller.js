class BookController {

    createBook(request, response, next) {
        // console.log(request.book);
        let repo = request.app.get('books.repo');
        repo.add(request.book).then( () => {
            response.redirect('/books');
        }).catch( (err) => {
            next(err);
        });
    }

    removeBook(request, response, next) {
        let repo = request.app.get('books.repo');
        repo.remove(request.params.id).then( () => {
            response.json({message:'Success'});
        }).catch( (err) => {
            next(err);
        });
    }

    editBook(request, response) {
        let repo = request.app.get('books.repo');
        repo.edit(request.book).then(function () {
            response.redirect('/books');
        });
    }

    search(request, response, next) {
        request.app.get('books.searcher').search(request.condition)
            .then( books => response.render('books.njk',{books:books}))
            .catch(next)
    }

    renderAddBook(request, response, next) {
        request.app.get('publishers.search').provideAll()
            .then( publishers => response.render('create.njk',{publishers:publishers}))
            .catch(next)
    }

    //using promise all in mozilla.org
    renderEditBook (req, res, next) {
        let booksPromise      = req.app.get('books.searcher').search(req.condition);
        let publishersPromise = req.app.get('publishers.search').provideAll();
        Promise.all([booksPromise, publishersPromise])
            .then( values => res.render('edit.njk', {book: values[0][0], publishers: values[1]}))
            .catch(next)
    }

    detail(request, response, next) {
        request.app.get('books.searcher').search(request.condition)
            .then( books => response.render('detail.njk',{book:books[0]}))
            .catch(next)
    }
}

module.exports = BookController;
