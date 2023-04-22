const asyncHandler = require("../middlewares/asyncHandler");
const Product = require("../models/Product");
const Review = require("../models/Review");
const APIError = require("../util/APIError");

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
const deleteReview = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) return next(new APIError(`No review for this id ${id}`, 404));
    const result = await Review.aggregate([
        // get all reviews in a specific product
        { $match: { product: review.product } },
        // Grouping Reviews Based on productId and calculate average Ratings, Ratings Qunatity
        {
            $group: {
                _id: "product",
                avgRatings: { $avg: "$ratings" },
                ratingsQuantity: { $sum: 1 }
            }
        }
    ]);
    if (result.length > 0) {
        const product = await Product.findByIdAndUpdate(
            review.product,
            {
                ratingsAverage: result[0].avgRatings,
                ratingsQuantity: result[0].ratingsQuantity
            },
            { new: true }
        );
        if (!product) return Promise.reject(new APIError("Can't Update Ratings In Product", 400));
    } else {
        const product = await Product.findByIdAndUpdate(
            review.product,
            {
                ratingsAverage: 0,
                ratingsQuantity: 0
            },
            { new: true }
        )
        if (!product) return Promise.reject(new APIError("Can't Update Ratings In Product", 400));
    }
    res.status(204).json({ success: true });
});


module.exports = {
    createReview,
    updateReview,
    getReview,
    getReviews,
    deleteReview,
    createFilterObj,
    setProductIdAndUserId
}