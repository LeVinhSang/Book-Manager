class Publisher {

    /**
     *
     * @param {string} name
     */
    constructor (name) {
        this.name = name;
    }

    /**
     *
     * @return {int|null}
     */
    getId () {
        return this.id;
    }

    /**
     *
     * @return {string|*}
     */
    getName () {
        return this.name;
    }

    /**
     *
     * @return {string|null}
     */
    getAddress () {
        return this.address;
    }

    /**
     *
     * @return {number|null}
     */
    getPhone() {
        return this.phone;
    }

    /**
     *
     * @param {int} id
     */
    setId (id) {
        this.id= id;
    }

    /**
     *
     * @param {string} address
     */
    setAddress (address) {
        this.address = address;
    }

    /**
     *
     * @param {number} phone
     */
    setPhone (phone) {
        this.phone = phone;
    }
}

module.exports = Publisher;