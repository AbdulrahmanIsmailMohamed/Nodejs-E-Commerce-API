const Review = require("../models/Review")

const {
    createOne,
    deleteOne,
    getAll,
    updateOne,
    getOne
} = require("./handlerFactory");

const setProductIdAndUserId = (req, res, next) => {
    if (req.params.productId) {
        req.body.product = req.params.productId;
        req.body.userId = req.user._id;
    }
    next();
}

/**
    @access private
*/
const createReview = createOne(Review);

/**
    @access private
*/
const updateReview = updateOne(Review);

/**
    @access public
*/
const getReview = getOne(Review);

/**
    @access public
*/
const createFilterObj = (req, res, next) => {
    let filter = {};
    if (req.params.productId) filter = { product: req.params.productId };
    req.filterObj = filter;
    next();
}

const getReviews = getAll(Review);

/**
    @access private
*/
const deleteReview = deleteOne(Review)


module.exports = {
    createReview,
    updateReview,
    getReview,
    getReviews,
    deleteReview,
    createFilterObj,
    setProductIdAndUserId
}