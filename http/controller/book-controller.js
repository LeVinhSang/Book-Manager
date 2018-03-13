class BookController {

    constructor() {

    }

    createBook(request, response, next) {
        // console.log(request.book);
        let repo = request.app.get('books.repo');
        repo.add(request.book).then( () => {
            response.status(201).send({message: "Success!"});
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
            response.json({message:'Success'});
        });
    }

    search(request, response, next) {
        request.app.get('books.searcher').search(request.condition)
            .then((results) => response.send(results.map(result => result.toJson())))
            .catch(next)
    }

    searchViews(request, response, next) {
        request.app.get('books.searcher').search(request.condition)
            .then( books => response.render('books.njk',{books:books}))
            .catch(next)
    }

    detail(request, response, next) {
        request.app.get('books.searcher').search(request.condition)
            .then( books => {
                if(!books.length) {
                    return response.status(404).send("Not Found!");
                }
                response.render('detail.njk',{book:books[0]})})
            .catch(next)
    }
}

module.exports = BookController;