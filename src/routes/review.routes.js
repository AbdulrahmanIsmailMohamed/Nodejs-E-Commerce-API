const router = require("express").Router();

const { protectRoute, allowTo } = require("../config/auth");
const {
    getReviews,
    createReview,
    updateReview,
    deleteReview,
    getReview
} = require("../controllers/review.controller");
const {
    createReviewValidator,
    updateReviewValidator,
    reviewIdValidator,
    deleteReviewValidator
} = require("../util/validator/reviewValidator");

router
    .route("/")
    .get(getReviews)
    .post(
        protectRoute,
        createReviewValidator,
        createReview
    );


router
    .route("/:id")
    .get(reviewIdValidator, getReview)
    .patch(
        protectRoute,
        allowTo("user"),
        updateReviewValidator,
        updateReview
    )
    .delete(
        protectRoute,
        allowTo("admin", "manager", "user"),
        deleteReviewValidator,
        deleteReview
    );

module.exports = router;