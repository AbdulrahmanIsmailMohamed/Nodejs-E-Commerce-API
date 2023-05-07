const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const hashResetCode = require("../util/hashResetCode")
const asyncHandling = require("../middlewares/asyncHandler")
const User = require('../models/user');
const APIError = require('../util/APIError');
const sendMail = require("../util/sendMail");
const createToken = require("../util/createToken");

const {
    senitizeUserLogin,
    senitizeUserSignup
} = require('../util/senitizeData');

const signup = asyncHandling(async (req, res, next) => {
    const { name, email, password, slug } = req.body;
    const user = await User.create({ name, slug, email, password });
    if (!user) return next(new APIError("An error occurred during the registration process"));
    const token = createToken({ id: user._id, role: user.role })
    res.status(201).json({ data: senitizeUserSignup(user), token })
});

const login = asyncHandling(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOneAndUpdate({ email }, { active: true }, { new: true });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return next(new APIError("An error occurred in the email Or Password", 400));
    }
    const token = createToken({ id: user._id, role: user.role })
    res.status(200).json({ data: senitizeUserLogin(user), token })
});

const forgotPassword = asyncHandling(async (req, res, next) => {
    // 1) Get user by email
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password")
    console.log(user);
    if (!user) return next(new APIError(`There is no user with that email ${email}`, 404));

    // 2) If user exist, Generate hash reset random 6 digits and save it in db
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.passwordResetCode = hashResetCode(resetCode);
    user.passwordResetCodeExpire = Date.now() + 10 * 60 * 1000;
    user.passwordResetVerified = false;
    await user.save();

    // 3) Send the reset code via email
    const message = `<h2>Hi ${user.name}</h2> <p>We received a request to reset the password on your E-shop Account.</p> <h3>${resetCode}</h3> <p>Enter this code to complete the reset</p> <p>Thanks for helping us keep your account secure</p><p>The E-shop Team</p>`;
    try {
        await sendMail({
            email: user.email,
            subject: "Your Password Rest Code (Valid For 10 Minute",
            message
        });
    } catch (err) {
        user.passwordResetCode = undefined;
        user.passwordResetCodeExpire = undefined;
        user.passwordResetVerified = undefined;
        await user.save();
        next(new APIError("Username and Password not accepted", 500));
        return;
    }
    res.status(200).json({ status: "The Rest Code send in email" });
});

const verifyRestCode = asyncHandling(async (req, res, next) => {
    const { resetCode } = req.body;
    const user = await User.findOne({
        passwordResetCode: hashResetCode(resetCode),
        passwordResetCodeExpire: { $gt: Date.now() }
    }).select("-password");
    if (!user) return next(new APIError("Rest Code Invalid Or Expired", 400));

    user.passwordResetVerified = true;
    await user.save();
    res.status(200).json("Now, Can Change Your Password");
});

const resetPassword = asyncHandling(async (req, res, next) => {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new APIError(`There is no user with email ${email}`, 404));
    if (!user.passwordResetVerified) return next(new APIError('Reset code not verified', 400));

    user.password = newPassword;
    user.passwordResetCode = undefined;
    user.passwordResetCodeExpire = undefined;
    user.passwordResetVerified = undefined;
    await user.save();

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SEC,
        { expiresIn: process.env.JWT_EXPIRE }
    );
    res.status(200).json({ status: 'Success', token })
});

module.exports = {
    signup,
    login,
    forgotPassword,
    verifyRestCode,
    resetPassword
};