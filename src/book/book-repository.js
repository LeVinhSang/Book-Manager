const Book       = require('./book');
const Connection = require('../../database/knexConnection');

class BookRepository{

    /**
     *
     * @param {Connection} connection
     */
    constructor(connection) {
        this.connection = connection;
    }

    /**
     *
     * @param {Book} book
     * @return {Promise <void>}
     */
    add(book) {
        return this.connection('books').insert({
            title: book.getTitle(),
            author: book.getAuthor(),
            publisher_id: book.getPublisher().getId(),
            price: book.getPrice()
        });
    }

    /**
     *
     * @param {Book} book
     * @return {Promise <void>}
     */
    edit(book) {
        return this.connection('books').update({
            title: book.getTitle(),
            author: book.getAuthor(),
            publisher_id: book.getPublisher().getId() ? book.getPublisher().getId() : null,
            price: book.getPrice()
        }).where({
            id: book.getId()
        });
    }


    /**
     *
     * @param {int} id
     * @return {Promise <void>}
     */
    remove(id) {
        return this.connection('books').update({
            deleted_at: new Date().toLocaleString()
        }).where({
            id: id
        });
    }


}

module.exports = BookRepository;
