class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4) ? "Fail" : "Error";
        this.isOperation = true
    }
}

module.exports = APIError;