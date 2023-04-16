const router = require("express").Router();

const {
    signup,
    login,
    forgotPassword,
    verifyRestCode,
    resetPassword
} = require("../controllers/auth.controller");
const {
    signupValidator,
    loginValidator
} = require("../util/validator/authValidator");

router.post("/forgotPassword", forgotPassword);

router.post("/verifyRestCode", verifyRestCode);

router.patch("/resetPassword", resetPassword);

router.post("/signup", signupValidator, signup);

router.post("/login", loginValidator, login);

module.exports = router;