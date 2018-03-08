const express        = require('express');
const bodyParser     = require('body-parser');
const knex           = require('./database/knexConnection');
const router         = require('./router/router');
const app            = express();
const BookRepository = require('./src/book/book-repository');
const BookFactory    = require('./src/book/book-factory');
const Searcher       = require('./src/searching-service/searcher');

app.set('books.repo', new BookRepository(knex));
app.set('books.searcher', new Searcher(knex, new BookFactory()));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);


app.listen(3000, () => {
    console.log('sever running');
});
