const connection        = require('../../database/knexConnection');
const PublisherFactory  = require('./publisher-factory');
const Publisher         = require('./publisher');

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

                if(results.length === 0) {
                    return new Publisher("");
                }
                return publisherFactory.makeFromDB(results[0]);
            });
    }

    provideAll() {
        return this.connection.select().from('publishers')
            .then( publisherRowsData => {
                let publishers;

                publishers = publisherRowsData.map( publisherRaw => {
                    let publisher = new Publisher(publisherRaw.name);
                    publisher.setId(publisherRaw.id);
                    publisher.setAddress(publisherRaw.address);
                    publisher.setPhone(publisherRaw.phone);

                    return publisher;
                });
                return publishers;
            });
    }

}

module.exports = PublisherProvide;