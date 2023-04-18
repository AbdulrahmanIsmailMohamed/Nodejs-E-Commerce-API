const router = require("express").Router();

const { protectRoute, allowTo } = require("../config/auth");
const {
    getReviews,
    createReview,
    updateReview,
    deleteReview,
    getReview
} = require("../controllers/review.controller");


router
    .route("/")
    .get(getReviews)
    .post(protectRoute, createReview);


router
    .route("/:id")
    .get(getReview)
    .patch(protectRoute, allowTo("user"), updateReview)
    .delete(protectRoute, allowTo("admin", "manager", "user"), deleteReview);

module.exports = router;