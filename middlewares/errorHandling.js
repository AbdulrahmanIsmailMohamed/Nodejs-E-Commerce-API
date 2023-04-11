const APIError = require("../util/APIError");

const errorForDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.statusCode,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const errorForProd = (err, res) => {
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
    })
}

const handleJwtInvalidSignature = () =>
    new APIError('Invalid token, please login again..', 401);

const handleJwtExpired = () =>
    new APIError('Expired token, please login again..', 401);

const errorHandling = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Error"
    if (process.env.NODE_ENV === "development") {
        errorForDev(err, res) // it works in development mode
    } else {
        if (err.name === "JsonWebTokenError") err = handleJwtInvalidSignature();
        if (err.name === "TokenExpiredError") err = handleJwtExpired();
        errorForProd(err, res) // it works in production mode
    }
}

module.exports = errorHandling