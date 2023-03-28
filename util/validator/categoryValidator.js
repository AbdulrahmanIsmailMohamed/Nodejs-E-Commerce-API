const { check } = require("express-validator")
const validatorMW = require("../../middlewares/validatorMW")

const categoryIdValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid Category Id Format!"),
    validatorMW
]

const createCategoryValidator = [
    check("name")
        .isLength({ min: "3" })
        .withMessage("The Name Is Short Category Name")
        .isLength({ max: "32" })
        .withMessage("The Name Is Long Category Name"),
    validatorMW
]

const updateCategoryValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid Category Id Format!"),

    check("name")
        .optional()
        .notEmpty()
        .withMessage("The Name Is not must be empty")
        .isLength({ min: "3" })
        .withMessage("The Name Is Short Category Name")
        .isLength({ max: "32" })
        .withMessage("The Name Is Long Category Name"),

    validatorMW
]

module.exports = {
    categoryIdValidator,
    updateCategoryValidator,
    createCategoryValidator
}