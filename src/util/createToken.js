const jwt = require("jsonwebtoken");

const createToken = (user) =>
    jwt.sign(
        {
            userId: user.id,
            role: user.role
        },
        process.env.JWT_SEC,
        { expiresIn: process.env.JWT_EXPIRE }
    );

module.exports = createToken;