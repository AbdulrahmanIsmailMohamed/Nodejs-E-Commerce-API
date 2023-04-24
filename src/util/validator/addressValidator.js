const { check } = require("express-validator");

const validatorMW = require("../../middlewares/validatorMW");
const User = require("../../models/user");
const APIError = require("../APIError");

const addressIdValidator = [
    check("addressId")
        .isMongoId()
        .withMessage("Invalid Address Id Format"),

    validatorMW
]

const createAddressValidator = [
    check("alias")
        .optional()
        .isString()
        .withMessage("The Alias Must Be String")
        .custom(async (val, { req }) => {
            try {
                const user = await User.findById(req.user._id).select("addresses -_id");
                const address = user.addresses.find(obj => obj.alias === val);
                if (address ) return Promise.reject(new APIError("The ALias Must Be Not Dublicated!!", 400));
                return true
            } catch (err) {
                console.log(err);
                return Promise.reject(new APIError("Internal Server Error", 500));
            }
        }),

    check("details")
        .optional()
        .isString()
        .withMessage("The Details Must Be String"),

    check("phone")
        .optional()
        .isMobilePhone("ar-EG")
        .withMessage("The number is not phone"),
    check("city")
        .optional()
        .isString()
        .withMessage("The City Must Be String"),

    check("postalcode")
        .optional()
        .isString()
        .withMessage("The Postalcode Must Be String"),

    validatorMW
];

module.exports = {
    createAddressValidator,
    addressIdValidator
}