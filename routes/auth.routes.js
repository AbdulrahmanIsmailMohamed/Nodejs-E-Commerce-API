const router = require("express").Router();

const {
    signup,
    login,
    forgotPassword
} = require("../controllers/auth.controller");
const {
    signupValidator,
    loginValidator
} = require("../util/validator/authValidator");

router.post("/forgotPassword", forgotPassword);

router.post("/signup", signupValidator, signup);

router.post("/login", loginValidator, login);

module.exports = router;