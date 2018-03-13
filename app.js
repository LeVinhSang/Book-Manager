const express        = require('express');
const bodyParser     = require('body-parser');
const knex           = require('./database/knexConnection');
const router         = require('./router/index');
const app            = express();
const BookRepository = require('./src/book/book-repository');
const BookFactory    = require('./src/book/book-factory');
const Searcher       = require('./src/searching-service/searcher');
const nunjucks       = require('nunjucks');

app.set('books.repo', new BookRepository(knex));
app.set('books.searcher', new Searcher(knex, new BookFactory()));


nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router.routerApi);


app.listen(8080, () => {
    console.log('sever running');
});
