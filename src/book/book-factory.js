const Book              = require('./book');
const PublisherProvider = require('../publisher/publisher-provider');
const knexConnection    = require('../../database/knexConnection');
const PublisherFactory  = require('../publisher/publisher-factory');


let publisherProvider   = new PublisherProvider(knexConnection);
let publisherFactory    = new PublisherFactory();

class BookFactory{


    makeFromRequest(bookRaw) {
        let book = new Book(bookRaw.title, bookRaw.author);
        book.setPrice(bookRaw.price);
        return book;
    }
    /**
     *
     * @param {Object} bookRaw
     * @return {Book}
     */
    makeFromDB(bookRaw) {
        let book = this.makeFromRequest(bookRaw);
        let publisher = publisherFactory.makeFromDB(bookRaw);
        book.setPublisher(publisher);
        return book;
    }

    make(bookRaw) {
        let book = this.makeFromRequest(bookRaw);
        return publisherProvider.provide(bookRaw.publisher_id)
            .then( publisher => {
                book.setPublisher(publisher);
                return book;
            });
    }
}

module.exports = BookFactory;
