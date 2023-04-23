const { check } = require("express-validator");
const validatorMW = require("../../middlewares/validatorMW");
const Product = require("../../models/Product");
const APIError = require("../APIError");

const productIdValidator = [
    check("productId")
        .isMongoId()
        .withMessage("Invalid Product Id Foramt")
        .custom(async (val) => {
            try {
                const product = await Product.findById(val);
                if (!product) return Promise.reject(new APIError("Product Not Found"));
                return true;
            } catch (err) {
                console.log(err);
                return Promise.reject(new APIError("Internal Server Error", 500));
            }
        }),

    validatorMW
];

module.exports = {
    productIdValidator
}