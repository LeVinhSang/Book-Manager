const express                  = require('express');
const router                   = express.Router();
const BookController           = require('../../http/controller/book/book-controller');
const UndeletedSearchCondition = require('../../src/searching-service/undeleted-search-condition');
const IdSearchCondition        = require('../../src/searching-service/id-search-condition');
const KeywordSearchCondition   = require('../../src/searching-service/keyword-search-condition');
const AdvanceSearchCondition   = require('../../src/searching-service/advance-search-condition');
const bookRequest              = require('../../http/middleware/book-request');
const checkLength              = require('../../http/middleware/check-length');
const checkNull                = require('../../http/middleware/check-null');

let bookController             = new BookController();


router.get('/', (req, res) => {
    res.render('home.njk', { title: 'Express' });
});


router.get('/create', bookController.renderAddBook);


router.get('/books', (req, res, next) => {
    req.condition = new UndeletedSearchCondition();
    next();
},bookController.search);


router.get('/book/:id', (req, res, next) => {
    req.condition = new IdSearchCondition(req.params.id);
    next();
}, bookController.detail);


router.get('/edit/:id', (req, res, next) => {
    req.condition = new IdSearchCondition(req.params.id);
    next();
}, bookController.renderEditBook);



router.post('/book', checkNull, checkLength, bookRequest, bookController.createBook);

router.post('/edit/:id', checkNull, checkLength, bookRequest, bookController.editBook);

router.post('/delete/:id', checkNull, checkLength, bookController.removeBook);

router.put('/book/:id', checkNull, checkLength, bookRequest, bookController.editBook);

router.delete('/book/:id', bookController.removeBook);

router.get('/search-advance', (req, res, next) => {
    req.condition = new AdvanceSearchCondition(req.query.title, req.query.author, req.query.publisher);
    next();
}, bookController.search);

router.get('/search-basic', (req, res, next) => {
    req.condition = new KeywordSearchCondition(req.query.keyword);
    next();
}, bookController.search);

module.exports = router;
