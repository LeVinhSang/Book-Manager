const AdvanceSearchCondition   = require('../../src/searching-service/advance-search-condition');
const KeywordSearchCondition   = require('../../src/searching-service/keyword-search-condition');
const UnDeletedSearchCondition = require('../../src/searching-service/undeleted-search-condition');
const IdSearchCondition        = require('../../src/searching-service/id-search-condition');

module.exports = (req, res, next) => {
    req.condition = makeCondition(req);
    next();
};

function makeCondition(request) {
    if(request.path === '/search-advance') {
        return new AdvanceSearchCondition(request.query.title, request.query.author, request.query.publisher);
    }
    else if (request.path === '/search-basic'){
        return new KeywordSearchCondition(request.query.keyword);
    }
    else if (request.path === '/books'){
        return new UnDeletedSearchCondition();
    }
    else if (request.path.toString().startsWith('/book/')) {
        return new IdSearchCondition(request.params.id);
    }
    else if (request.path.toString().startsWith('/edit/')) {
        return new IdSearchCondition(request.params.id);
    }
}