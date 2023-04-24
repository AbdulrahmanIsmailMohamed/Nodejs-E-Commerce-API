const Coupon = require("../models/Coupon")

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
const createCoupon = createOne(Coupon);

/**
    @access private
*/
const updateCoupon = updateOne(Coupon);

/**
    @access private
*/
const getCoupon = getOne(Coupon);

/**
    @access private
*/
const getCoupons = getAll(Coupon);

/**
    @access private
*/
const deleteCoupon = deleteOne(Coupon)


module.exports = {
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getCoupon,
    getCoupons
}