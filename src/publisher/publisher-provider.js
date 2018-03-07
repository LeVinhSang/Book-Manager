const Publisher = require('./publisher');

class PublisherProvide {

    /**
     *
     * @param publisherRaw
     * @return {Publisher}
     */
    makeFromRequest (publisherRaw) {
        let publisher = new Publisher(publisherRaw.name);
        publisher.setId(publisherRaw.id);
        publisher.setAddress(publisherRaw.address);
        publisher.setPhone(publisherRaw.phone);
        return publisher;
    }
}

module.exports = PublisherProvide;