const slugify = require("slugify");
const { check } = require("express-validator");

const validatorMW = require("../../middlewares/validatorMW");
const User = require("../../models/user");
const APIError = require("../APIError");

function isEmail(val) {
    return /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(val)

}

function isStrongPass(val) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(val)

}

const userIdValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid Category Id Format!"),
    validatorMW
]


const createUserValidator = [
    check("name")
        .isLength({ min: 3 })
        .withMessage("The Name Is Short User Name")
        .isLength({ max: 100 })
        .withMessage("The Name Is Long User Name")
        .custom((name, { req }) => {
            console.log(name, req.body);
            req.body.slug = slugify(name);
            return true;
        }),

    check("email")
        .notEmpty()
        .withMessage("The Email Is Required")
        .custom(async (val) => {
            if (isEmail(val)) {
                try {
                    const user = await User.findOne({ email: val });
                    if (user) return Promise.reject(new APIError("Email is Excist Please Login", 400));
                    return true
                } catch (err) {
                    console.log(err);
                }
            }
            return Promise.reject(new APIError("Email is Excist Please Login", 400))
        }),

    check("password")
        .notEmpty()
        .withMessage("The password is required")
        .isLength({ min: 8 })
        .withMessage("The password must be at least 8 chars")
        .custom((val) => {
            if (isStrongPass(val)) return true
            return Promise.reject(new APIError("The Password must be contain at least one lowercase letterone uppercase letter, one numeric digit, and one special character"))
        }),

    check("phone")
        .optional()
        .notEmpty()
        .withMessage("The Phone must not be null")
        .isMobilePhone("ar-EG")
        .withMessage("The number is not phone"),

    check("imgProfile")
        .optional(),

    validatorMW
]

const updateUserValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid User Id Format!"),

    check("name")
        .optional()
        .isLength({ min: 3 })
        .withMessage("The Name Is Short User Name")
        .isLength({ max: 100 })
        .withMessage("The Name Is Long User Name")
        .custom((name, { req }) => {
            console.log(name, req.body);
            req.body.slug = slugify(name);
            return true;
        }),

    check("email")
        .optional()
        .notEmpty()
        .withMessage("The Email Is Required")
        .custom(async (val) => {
            if (isEmail(val)) {
                try {
                    const user = await User.findOne({ email: val });
                    console.log(user)
                    if (user) return Promise.reject(new APIError("Email is Excist Please Login", 400));
                    return true
                } catch (err) {
                    console.log(err);
                }
            }
            return Promise.reject(new APIError("Email is Excist Please Login", 400))
        }),

    check("password")
        .optional()
        .notEmpty()
        .withMessage("The password is required")
        .isLength({ min: 8 })
        .withMessage("The password must be at least 8 chars")
        .custom((val) => {
            if (isStrongPass(val)) return true
            return Promise.reject(new APIError("The Password must be contain at least one lowercase letterone uppercase letter, one numeric digit, and one special character"))
        }),

    check("phone")
        .optional()
        .notEmpty()
        .withMessage("The Phone must not be null")
        .isMobilePhone("ar-EG")
        .withMessage("The number is not phone"),

    check("imgProfile")
        .optional(),

    validatorMW
]

module.exports = {
    userIdValidator,
    updateUserValidator,
    createUserValidator
}