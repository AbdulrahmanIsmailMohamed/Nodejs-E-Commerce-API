const errorHandling = (err, req, res, nxt) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Error"
    if (process.env.NODE_ENV == "development") {
        errorForDev(err, res) // it works in development mode
    } else {
        errorForProd(err, res) // it works in production mode
    }
}

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

module.exports = errorHandling