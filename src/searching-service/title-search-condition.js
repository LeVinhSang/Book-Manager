class TitleSearchCondition {

    /**
     *
     * @param {string} title
     */
    constructor (title){
        this.title = title;
    }

    /**
     *
     * @param sqlQuery
     * @return {Book[]}
     */
    describe(sqlQuery) {
        return sqlQuery.where('title', this.title)
            .where({'books.deleted_at': null});
    }
}

module.exports = TitleSearchCondition;
