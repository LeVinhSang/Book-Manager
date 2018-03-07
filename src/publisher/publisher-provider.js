const connection        = require('../../database/knexConnection');
const PublisherFactory  = require('./publisher-factory');

let publisherFactory    = new PublisherFactory();

class PublisherProvide {

    /**
     *
     * @param connection
     */
    constructor(connection) {
        this.connection = connection;
    }

    provide (id) {
        return connection.select()
            .from('publishers')
            .where({id : id})
            .then(results => {
                return publisherFactory.makeFromDB(results[0]);
            });
    }

}

module.exports = PublisherProvide;