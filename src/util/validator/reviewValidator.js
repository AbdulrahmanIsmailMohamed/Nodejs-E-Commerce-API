const { check } = require("express-validator")

const validatorMW = require("../../middlewares/validatorMW")
const Product = require("../../models/Product")
const APIError = require("../APIError")
const Review = require("../../models/Review")

const reviewIdValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid review Id Format!"),
    validatorMW
];

const createReviewValidator = [
    check("title")
        .optional()
        .notEmpty()
        .withMessage("Review Name is not must be empty"),

    check("ratings")
        .isLength({ min: 1 })
        .withMessage("The rating is must be at least 1.0")
        .isLength({ max: 5 })
        .withMessage("The rating is must be at most 5.0"),

    check("userId")
        .notEmpty()
        .withMessage("The User Id Must Be Not Null")
        .isMongoId()
        .withMessage("Invalid review Id Format!"),

    check("product")
        .notEmpty()
        .withMessage("The Product Id Must Be Not Null")
        .isMongoId()
        .withMessage("Invalid review Id Format!")
        .custom(async (val, { req }) => {
            try {
                const product = await Product.findById(val);
                if (!product) return Promise.reject(new APIError(`Not Found Product for this id ${val}`, 404));
                const review = await Review.findOne({ product: val, userId: req.user._id })
                if (review) return Promise.reject(new APIError(`You created a review before that`, 400));
                return true;
            } catch (err) {
                console.log(err);
            }
        }),

    validatorMW
];

const updateReviewValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid review Id Format!")
        .custom(async (val, { req }) => {
            try {
                const review = await Review.findById(val);
                if (!review) return Promise.reject(new APIError(`Not Found Review for this id ${req.params.id}`, 404));
                if (req.user._id.toString() !== review.userId._id.toString()) return Promise.reject(new APIError(`Your not allow to access this action`, 401));
                return true;
            } catch (err) {
                return Promise.reject(new APIError("Internal Server Error", 500));
            }
        }),

    check("title")
        .optional()
        .notEmpty()
        .withMessage("Review Name is not must be empty"),

    check("ratings")
        .optional()
        .isLength({ min: 1 })
        .withMessage("The rating is must be at least 1.0")
        .isLength({ max: 5 })
        .withMessage("The rating is must be at most 5.0"),

    check("userId")
        .optional()
        .notEmpty()
        .withMessage("The User Id Must Be Not Null")
        .isMongoId()
        .withMessage("Invalid review Id Format!"),


    check("product")
        .optional()
        .notEmpty()
        .withMessage("The Product Id Must Be Not Null")
        .isMongoId()
        .withMessage("Invalid review Id Format!")
        .custom(async (val) => {
            try {
                const product = await Product.findById(val);
                if (!product) return Promise.reject(new APIError(`Not Found Product for this id ${val}`, 404));
                return true;
            } catch (err) {
                console.log(err);
            }
        }),

    validatorMW
]

const deleteReviewValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid review Id Format!")
        .custom(async (val, { req }) => {
            try {
                if (req.user.role === "user") {
                    const review = await Review.findById(req.params.id);
                    if (!review) return Promise.reject(new APIError(`Not Found Review for this id ${req.params.id}`, 404));
                    if (req.user._id.toString() !== review.userId._id.toString()) return Promise.reject(new APIError(`Your not allow to access this action`, 401));
                }
                return true;
            } catch (err) {
                console.log(err);
            }
        }),

    validatorMW
]

module.exports = {
    reviewIdValidator,
    updateReviewValidator,
    createReviewValidator,
    deleteReviewValidator
}