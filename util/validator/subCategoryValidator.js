const slugify = require("slugify");
const { check } = require("express-validator")
const validatorMW = require("../../middlewares/validatorMW")

const subCategoryIdValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid subCategory Id Format!"),
    validatorMW
]

const createSubCategoryValidator = [
    check("name")
        .notEmpty()
        .withMessage("The name is not must be null")
        .isLength({ min: "2" })
        .withMessage("The Name Is Short subCategory Name")
        .isLength({ max: "32" })
        .withMessage("The Name Is Long subCategory Name")
        .custom((name, { req }) => {
            req.body.slug = slugify(name);
            return true
        }),

    check("category")
        .notEmpty()
        .withMessage("The subCategory id is required")
        .isMongoId()
        .withMessage("Invalid subCategory id format"),

    validatorMW
]

const updateSubCategoryValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid subCategory Id Format!"),

    check("name")
        .optional()
        .notEmpty()
        .withMessage("The SubCategory is not must be null")
        .isLength({ min: "2" })
        .withMessage("The Name Is Short subCategory Name")
        .isLength({ max: "32" })
        .withMessage("The Name Is Long subCategory Name")
        .custom((name, { req }) => {
            req.body.slug = slugify(name);
            return true
        }),

    check("category")
        .optional()
        .notEmpty()
        .withMessage("The subCategory id is required")
        .isMongoId()
        .withMessage("Invalid subCategory id format"),

    validatorMW
]

module.exports = {
    subCategoryIdValidator,
    updateSubCategoryValidator,
    createSubCategoryValidator
}