class BookController {

    constructor() {

    }

    createBook(request, response, next) {
        // console.log(request.book);
        let repo = request.app.get('books.repo');
        repo.add(request.book).then( () => {
            response.send({message:'success'});
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

    //add function new
}

module.exports = BookController;