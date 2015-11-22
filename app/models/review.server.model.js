var mongoose = require("mongoose"), Schema = mongoose.Schema;

var ReviewSchema =  new Schema({
    author: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    reviewBody: {
        type: String,
    },
    reviewTitle: {
        type: String,
    },
    starRating: {
        type: String,
    },
    ImgURL: {
        type: String,
    }
});


mongoose.model('Review', ReviewSchema);