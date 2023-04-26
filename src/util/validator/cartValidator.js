const { check } = require("express-validator");
const Product = require("../../models/Product");
const APIError = require("../APIError");
const validatorMW = require("../../middlewares/validatorMW");

const cartItemIdValidator = [
    check("cartItemId")
        .isMongoId()
        .withMessage("Invalid cartItemId Format!!"),

    validatorMW
];

const addProductToCartValidator = [
    check("productId")
        .notEmpty()
        .withMessage("Product Id Is Required!")
        .isMongoId()
        .withMessage("Invalid Product Id Format!")
        .custom(async (val, { req }) => {
            try {
                const product = await Product.findById(val);
                if (!product) return Promise.reject(new APIError(`Not Found Product For This ${val}`, 404))
                return true;
            } catch (err) {
                console.log(err);
                return Promise.reject(new APIError(`Internal Server Error`, 500));
            }
        }),

    check("color")
        .optional()
        .isString()
        .withMessage("The Color Must Be String"),

    validatorMW
];

const updateTheQuantityofcartItemsValidator = [
    check("cartItemId")
        .isMongoId()
        .withMessage("Invalid Product Id Format!"),

    check("quantity")
        .notEmpty()
        .withMessage("The Quantity Is Must Be Not Null")
        .isNumeric()
        .withMessage("The Quantity Is Must Be Number"),

    validatorMW
];

const applyCouponValidator = [
    check("coupon")
        .notEmpty()
        .withMessage("The Coupon Name Is Must Be Not Null"),
    validatorMW
];

module.exports = {
    cartItemIdValidator,
    addProductToCartValidator,
    updateTheQuantityofcartItemsValidator,
    applyCouponValidator
}