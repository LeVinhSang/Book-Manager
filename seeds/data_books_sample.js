
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('books').truncate()
        .then(function () {
            // Inserts seed entries
            return knex('books').insert([
                {title: 'Dragon Ball',       author: 'Akira', publisher_id: 1, price: 12000},
                {title: 'Dragon Ball Z',     author: 'Akira', publisher_id: 2, price: 12000},
                {title: 'Dragon Ball Super', author: 'Akira', publisher_id: 3, price: 12000}
            ]);
        });
};
