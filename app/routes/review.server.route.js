var reviews = require('../controllers/review.server.controller');

module.exports = function(app) {
    app.route('/api/reviews')
    .get(reviews.list)
    .post(reviews.create);
    
    app.route('/api/reviews/:reviewId')
    .get(reviews.read)
    .put(reviews.update)
    .delete(reviews.delete);
    
    app.param('reviewId', reviews.reviewByID);
    
};