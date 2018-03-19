const BookFactory = require('../../../src/book/book-factory');

let bookFactory   = new BookFactory();

module.exports = (req, res, next) => {

    bookFactory.makeBook(req.body)
        .then( (book) => {
            book.setId(req.body.id);
            req.book = book;
            next();
        });
};