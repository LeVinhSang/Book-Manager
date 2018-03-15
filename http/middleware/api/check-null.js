module.exports = (req, res, next) =>{
    if(!req.body.title) {
        return res.send('title must not null');
    }

    if(!req.body.author) {
        return res.send('author must not null');
    }

    if(!req.body.price) {
        req.body.price = 0;
    }

    next();
};