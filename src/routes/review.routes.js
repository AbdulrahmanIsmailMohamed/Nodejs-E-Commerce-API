// mergeParams: Allow us to access parameters on another routes
// exam: we need to access productId From product routes
const router = require("express").Router({ mergeParams: true });

const { protectRoute, allowTo } = require("../config/auth");
const {
    getReviews,
    createReview,
    updateReview,
    deleteReview,
    getReview,
    createFilterObj,
    setProductIdAndUserId
} = require("../controllers/review.controller");
const {
    createReviewValidator,
    updateReviewValidator,
    reviewIdValidator,
    deleteReviewValidator
} = require("../util/validator/reviewValidator");

router
    .route("/")
    .get(createFilterObj, getReviews)
    .post(
        protectRoute,
        setProductIdAndUserId,
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