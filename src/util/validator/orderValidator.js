const { check } = require("express-validator");

const Cart = require("../../models/Cart");
const validatorMW = require("../../middlewares/validatorMW");
const APIError = require("../APIError");

const orderIdValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid Order Id Format!!"),

    validatorMW
]

const createOrderValidator = [
    check("cartId")
        .isMongoId()
        .withMessage("Invalid Cart Id Format!!")
        .custom(async (val, { req }) => {
            try {
                const cart = await Cart.findById(val);
                if (!cart) return Promise.reject(new APIError(`Not Found Cart For This Id ${val}`, 404));
                return true
            } catch (err) {
                console.log(err);
                return Promise.reject(new APIError("Internal Server Error", 500));
            }
        }),

    check("shippingAddress")
        .optional()
        .notEmpty()
        .withMessage("The shippingAddress Must Be Not Null"),

    validatorMW
];

module.exports = {
    createOrderValidator,
    orderIdValidator
}