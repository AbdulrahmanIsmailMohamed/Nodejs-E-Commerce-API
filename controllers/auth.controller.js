const crypto = require("crypto");

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const asyncHandling = require("../middlewares/asyncHandler")
const APIErro = require("../util/APIError");
const User = require('../models/user');
const APIError = require('../util/APIError');

const signup = asyncHandling(async (req, res, next) => {
    const { name, email, password, slug } = req.body;
    const user = await User.create({ name, slug, email, password });
    if (!user) return next(new APIErro("An error occurred during the registration process"));

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SEC,
        { expiresIn: process.env.JWT_EXPIRE }
    );
    res.status(201).json({ data: user, token: token })
});

const login = asyncHandling(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return next(new APIError("An error occurred in the email Or Password", 400));
    }
    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SEC,
        { expiresIn: process.env.JWT_EXPIRE }
    );
    res.status(201).json({ data: user, token: token })
});

const forgotPassword = asyncHandling(async (req, res, next) => {
    // 1) Get user by email
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password")
    console.log(user);
    if (!user) return next(new APIError(`There is no user with that email ${email}`, 404));

    // 2) If user exist, Generate hash reset random 6 digits and save it in db
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    const hashResetCode = crypto.createHash("sha256").update(resetCode).digest("hex");
    console.log(hashResetCode);
    user.passwordResetCode = hashResetCode;
    user.passwordResetCodeExpire = Date.now() + 10 * 60 * 1000;
    user.passwordResetVerified = false;
    console.log(user);
    await user.save();
    // 3) Send the reset code via email
    res.json("Done");
})

module.exports = {
    signup,
    login,
    forgotPassword
}