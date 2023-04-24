const router = require("express").Router();

const {
    protectRoute,
    allowTo
} = require("../config/auth");
const {
    createCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon,
    getCoupon,
} = require("../controllers/coupon.controller");
const {
    createCouponValidator,
    updateCouponValidator,
    couponIdValidator
} = require("../util/validator/couponValidator");

router
    .route("/")
    .post(
        protectRoute,
        allowTo("admin", "manager"),
        createCouponValidator,
        createCoupon
    )
    .get(
        protectRoute,
        allowTo("admin", "manager"),
        getCoupons
    );

router
    .route("/:id")
    .patch(
        protectRoute,
        allowTo("admin", "manager"),
        updateCouponValidator,
        updateCoupon
        )
    .delete(
        protectRoute,
        allowTo("admin", "manager"),
        couponIdValidator,
        deleteCoupon
    )
    .get(
        protectRoute,
        allowTo("admin", "manager"),
        couponIdValidator,
        getCoupon
    );

module.exports = router;