class BookController {

    createBook(req, res, next) {
        let repo = req.app.get('books.repo');
        repo.add(req.book).then( () => {
            res.send({message: 'success'});
        }).catch( (err) => {
            next(err);
        });
    }

    removeBook(req, res, next) {
        let repo = req.app.get('books.repo');
        repo.remove(req.params.id).then( () => {
            res.redirect('/');
        }).catch( (err) => {
            next(err);
        });
    }

    editBook(req, res) {
        let repo = req.app.get('books.repo');
        repo.edit(req.book).then(function () {
            res.render('index.njk');
        });
    }

    search(req, res, next) {
        req.app.get('books.searcher').search(req.condition)
            .then( books => res.json(books))
            .catch(next)
    }

    renderAddBook(req, res, next) {
        req.app.get('publishers.search').provideAll()
            .then( publishers => res.json(publishers))
            .catch(next)
    }

    //using promise all in mozilla.org

    renderEditBook (req, res, next) {
        let booksPromise      = req.app.get('books.searcher').search(req.condition);
        let publishersPromise = req.app.get('publishers.search').provideAll();
        Promise.all([booksPromise, publishersPromise])
            .then( values => res.render('detail.njk', {book:values[0][0], publishers:values[1]}))
            .catch(next)
    }

    detail(req, res, next) {
        req.app.get('books.searcher').search(req.condition)
            .then( books => res.render('detail.njk', {book:books[0]}))
            .catch(next)
    }
}

module.exports = BookController;
