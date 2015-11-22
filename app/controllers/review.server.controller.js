var Review = require("mongoose").model('Review');

var getErrorMessage = function(err) 
{
    if (err.error) {
        for (var errName in err.error)
        {
            if(err.error[errName].message)
            return err.error[errName].message;
            }
        } else {
        return 'Unknown server error';
    }
};

exports.create = function(req, res)
{
    var review =  new Review(req.body);
    review.save(function(err) {
        if (err) {
            return res.status(400).send({
                message:getErrorMessage(err)
            });
        } else {
            res.json(review);
        }
    });
};

exports.list = function(req, res) {
    Review.find().sort('-dateCreated')
     .exec(function(err, reviews){
         console.log(err);
        if (err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(reviews);
        }
    });
};

exports.reviewByID = function(req, res, next, id) {
    Review.findById(id)
    .exec(function(err, review) {
        if (err) return next (err);
        if(!review) return next(new Error ('failed to load review' + id));
        req.review = review;
        next();
    });
};

exports.read = function(req, res) 
{
    res.json(req.review);
};

exports.update = function(req, res) 
{
    var review = req.review;
    review.author = req.body.author;
    review.dateCreated = req.body.dateCreated;
    review.reviewBody = req.body.reviewBody;
    review.reviewTitle = req.body.reviewTitle;
    review.starRating = req.body.starRating;
    review.ImgURL = req.body.ImgURL;
    
    review.save(function(err)
    {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            return res.json(review);
        }
    });
};

exports.delete = function(req, res) 
{
    var review = req.review;
    
    review.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(review);
        }
    });
};