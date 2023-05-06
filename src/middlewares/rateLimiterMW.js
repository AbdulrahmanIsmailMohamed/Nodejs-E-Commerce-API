const rateLimit = require('express-rate-limit');

const apiLimiter = (msg, time = 15, maxLimit = 5) =>
    rateLimit({
        windowMs: time * 60 * 1000, // Time
        max: maxLimit, // Limit each IP requests
        message: msg,
    });

module.exports = apiLimiter;