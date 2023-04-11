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
})

module.exports = {
    signup,
    login
}