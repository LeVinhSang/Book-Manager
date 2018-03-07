const Book        = require('../../src/book/book');
const knexConnection  = require('../../database/knexConnection');
const BookFactory = require('../../src/publisher/publisher-factory');
const Publisher   = require('../../src/publisher/publisher');

let factory = new BookFactory();

module.exports = function (req, res, next) {
    let book = new Book(req.body.title, req.body.author);
    book.setPrice(req.body.price);
    book.setId(req.params.id);

    //create publisher
    knexConnection.select()
        .from('publishers')
        .where({id : req.body.publisher_id})
        .then( results => {
            if(results.length === 0) {
                return new Publisher("");
            }
            return factory.makeFromRequest(results[0]);
        }).then( (publisher) => {
        book.setPublisher(publisher);
        req.book = book;
        next();
    });
};