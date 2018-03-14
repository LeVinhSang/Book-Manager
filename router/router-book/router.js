const express             = require('express');
const router              = express.Router();
const BookController      = require('../../http/controller/book/book-controller');
const check               = require('../../http/middleware/index');

let bookController        = new BookController();



router.get('/', (req, res) => {
    res.render('home.njk', { title: 'Express' });
});


router.get('/create', bookController.renderAddBook);

router.get('/books', check.searchCondition, bookController.search);

router.get('/book/:id', check.searchCondition, bookController.detail);

router.get('/edit/:id', check.searchCondition, bookController.renderEditBook);

router.post('/book', check.bookRequest, bookController.createBook);

router.post('/edit/:id', check.bookRequest, bookController.editBook);

router.put('/book/:id', check.bookRequest, bookController.editBook);

router.delete('/book/:id', bookController.removeBook);

router.get('/search-advance', check.searchCondition, bookController.search);

router.get('/search-basic', check.searchCondition, bookController.search);


module.exports = router;
