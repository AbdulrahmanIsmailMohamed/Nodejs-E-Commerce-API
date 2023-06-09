const slugify = require("slugify");
const { check } = require("express-validator");
const bcrypt = require("bcrypt")

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

    check("confirmPassword")
        .notEmpty()
        .withMessage("The Confirm Password is required"),

    check("password")
        .notEmpty()
        .withMessage("The password is required")
        .isLength({ min: 8 })
        .withMessage("The password must be at least 8 chars")
        .custom((val) => {
            if (isStrongPass(val)) return true;
            return Promise.reject(new APIError("The Password must be contain at least one lowercase letterone uppercase letter, one numeric digit, and one special character"));
        })
        .custom((password, { req }) => {
            if (password !== req.body.confirmPassword) return Promise.reject(new APIError("The Password And Confirm Password Not Valid"));
            return true;
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

    check("phone")
        .optional()
        .notEmpty()
        .withMessage("The Phone must not be null")
        .isMobilePhone("ar-EG")
        .withMessage("The number is not phone"),

    check("imgProfile")
        .optional(),

    validatorMW
];

const changePasswordValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid User Id Format!"),

    check("currentPassword")
        .notEmpty()
        .withMessage("The Current Password Is Required!")
        .custom((val) => {
            if (isStrongPass(val)) return true;
            return Promise.reject(new APIError("The Password must be contain at least one lowercase letterone uppercase letter, one numeric digit, and one special character"));
        })
        .custom(async (val, { req }) => {
            const user = await User.findById(req.params.id);
            if (!user) return Promise.reject(new APIError("The User Not Found!", 400));
            if (!bcrypt.compareSync(val, user.password)) return Promise.reject(new APIError("The Current User Password not valid!!", 400));
            return true;
        }),

    check("confirmPassword")
        .notEmpty()
        .withMessage("The Confirm Password Is not Must Be Null!!"),

    check("password")
        .notEmpty()
        .withMessage("The New Password is required")
        .isLength({ min: 8 })
        .withMessage("The password must be at least 8 chars")
        .custom((val) => {
            if (isStrongPass(val)) return true;
            return Promise.reject(new APIError("The Password must be contain at least one lowercase letterone uppercase letter, one numeric digit, and one special character"));
        })
        .custom((password, { req }) => {
            if (password !== req.body.confirmPassword) return Promise.reject(new APIError("The Password And Confirm Password Not Valid"));
            return true;
        }),

    validatorMW
]

module.exports = {
    userIdValidator,
    updateUserValidator,
    createUserValidator,
    changePasswordValidator
}