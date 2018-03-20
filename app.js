const express          = require('express');
const bodyParser       = require('body-parser');
const knex             = require('./database/knexConnection');
const router           = require('./router/index');
const app              = express();
const BookRepository   = require('./src/book/book-repository');
const BookFactory      = require('./src/book/book-factory');
const Searcher         = require('./src/searching-service/searcher');
const nunjucks         = require('nunjucks');
const PublisherProvide = require('./src/publisher/publisher-provider');

app.set('books.repo', new BookRepository(knex));
app.set('books.searcher', new Searcher(knex, new BookFactory()));
app.set('publishers.search', new PublisherProvide(knex));

app.use(express.static('public'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router.routerRender);


app.listen(8080, () => {
    console.log('sever running');
});
