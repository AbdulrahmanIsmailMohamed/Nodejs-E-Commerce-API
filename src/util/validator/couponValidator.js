const { check } = require("express-validator")
const validatorMW = require("../../middlewares/validatorMW");
const Coupon = require("../../models/Coupon");
const APIError = require("../APIError");

const couponIdValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid Coupon Id Format")
        .custom(async (val, { req }) => {
            try {
                const id = await Coupon.findById(req.params.id)
                if (!id) return Promise.reject(new APIError(`Not Found Coupon for this id ${val}`, 404));
                return true;
            } catch (err) {
                console.log(err);
                return Promise.reject(new APIError("Internal Server Error!!", 500));
            }
        }),
    validatorMW
];

const createCouponValidator = [
    check("name")
        .notEmpty()
        .withMessage("The Name Is Must Be Not Null")
        .toUpperCase()
        .isString()
        .withMessage("The Name Is Must Be String")
        .custom(async (val, { req }) => {
            try {
                const coupon = await Coupon.findOne({ name: val });
                if (coupon) return Promise.reject(new APIError(`The Name Is Must Be Not Dublicated!!`, 400));
                return true
            } catch (err) {
                console.log(err);
                return Promise.reject(new APIError("Internal Server Error", 500));
            }
        }),

    check("expire")
        .notEmpty()
        .withMessage("The Expire Is Must Be Not Null"),

    check("discount")
        .notEmpty()
        .withMessage("The Discount Is Must Be Not Null")
        .isNumeric()
        .withMessage("The Discount Is Must Be Number"),

    validatorMW
];

const updateCouponValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid Coupon Id Format")
        .custom(async (val, { req }) => {
            try {
                const id = await Coupon.findById(req.params.id)
                if (!id) return Promise.reject(new APIError(`Not Found Coupon for this id ${val}`, 404));
                return true;
            } catch (err) {
                console.log(err);
                return Promise.reject(new APIError("Internal Server Error!!", 500));
            }
        }),

    check("name")
        .optional()
        .notEmpty()
        .withMessage("The Name Is Must Be Not Null")
        .toUpperCase()
        .isString()
        .withMessage("The Name Is Must Be String")
        .custom(async (val, { req }) => {
            try {
                const coupon = await Coupon.findById(req.params.id);
                if (coupon.name === val) return true
                const couponName = await Coupon.findOne({ name: val });
                if (couponName) return Promise.reject(new APIError(`The Name Is Must Be Not Dublicated!!`, 400));
                return true
            } catch (err) {
                console.log(err);
                // return Promise.reject(new APIError("Internal Server Error", 500));
            }
        }),

    check("expire")
        .optional()
        .notEmpty()
        .withMessage("The Expire Is Must Be Not Null"),

    check("discount")
        .optional()
        .notEmpty()
        .withMessage("The Discount Is Must Be Not Null")
        .isNumeric()
        .withMessage("The Discount Is Must Be Number"),

    validatorMW
];
module.exports = {
    createCouponValidator,
    updateCouponValidator,
    couponIdValidator
}