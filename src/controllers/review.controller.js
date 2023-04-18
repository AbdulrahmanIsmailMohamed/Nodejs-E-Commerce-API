const Review = require("../models/Review")

const {
    createOne,
    deleteOne,
    getAll,
    updateOne,
    getOne
} = require("./handlerFactory");

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
}