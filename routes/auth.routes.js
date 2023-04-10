const router = require("express").Router();

const {
    signup,
    login
} = require("../controllers/auth.controller");
const {
    signupValidator,
    loginValidator
} = require("../util/validator/authValidator");

router.post("/signup", signupValidator, signup);

router.post("/login", loginValidator, login);

module.exports = router;