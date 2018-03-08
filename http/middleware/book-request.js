const BookFactory = require('../../src/book/book-factory');

let bookFactory   = new BookFactory();

module.exports = function (req, res, next) {
    bookFactory.makeBook(req.body)
        .then( (book) => {
            book.setId(req.params.id);
            req.book = book;
            next();
        });
};