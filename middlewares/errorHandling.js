const APIError = require("../util/apiError");

module.exports = {
    routeError: (app) => {
        app.all('*', (req, res, nxt) => {
            nxt(new APIError(`Can't Find This Route ${req.originalUrl}!!`, 400))
        });
    },
    errorHandling: (err, req, res, nxt) => {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || "Error"
        res.status(err.statusCode).json({
            status: err.statusCode,
            error: err,
            message: err.message
        });
        console.log({ error: err.stack });
    }
}