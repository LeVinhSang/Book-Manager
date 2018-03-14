const Publisher = require('./publisher');

class PublisherFactory {

    /**
     *
     * @param publisherRaw
     * @return {Publisher}
     */
    makeFromDB (publisherRaw) {
        let publisher = new Publisher(publisherRaw.name);
        publisher.setId(publisherRaw.publisher_id);
        publisher.setAddress(publisherRaw.address);
        publisher.setPhone(publisherRaw.phone);

        return publisher;
    }
}

module.exports = PublisherFactory;
