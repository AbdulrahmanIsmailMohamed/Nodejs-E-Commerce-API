const { check } = require("express-validator")
const validatorMW = require("../../middlewares/validatorMW")

const brandIdValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid Brand Id Format!"),
    validatorMW
]

const createBrandValidator = [
    check("name")
        .notEmpty()
        .withMessage("Brand Name is not must be empty")
        .isLength({ min: "3" })
        .withMessage("The Name Is Short Brand Name")
        .isLength({ max: "32" })
        .withMessage("The Name Is Long Brand Name"),
    validatorMW
]

const updateBrandValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid Brand Id Format!"),

    check("name")
        .optional()
        .notEmpty()
        .withMessage("The Name is not must be empty")
        .isLength({ min: "3" })
        .withMessage("The Name Is Short Brand Name")
        .isLength({ max: "32" })
        .withMessage("The Name Is Long Brand Name"),

    validatorMW
]

module.exports = {
    brandIdValidator,
    updateBrandValidator,
    createBrandValidator
}