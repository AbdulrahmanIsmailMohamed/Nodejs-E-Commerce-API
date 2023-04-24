const { v4: uuidv4 } = require("uuid")
const { check } = require("express-validator");

const validatorMW = require("../../middlewares/validatorMW");

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
        .withMessage("The Alias Must Be String"),

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