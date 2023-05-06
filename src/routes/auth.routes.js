const router = require("express").Router();

const apiLimiter = require("../middlewares/rateLimiterMW");
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

router.post(
    "/forgotPassword",
    apiLimiter("To Many Request From This IP, Please Try Again After A Quarter Hour"),
    forgotPassword
);

router.post("/verifyRestCode", verifyRestCode);

router.patch("/resetPassword", resetPassword);

router.post(
    "/signup",
    apiLimiter('Too many accounts created from this IP, please try again after a quarter hour'),
    signupValidator,
    signup
);

router.post("/login", loginValidator, login);

module.exports = router;