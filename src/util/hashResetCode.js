const crypto = require('crypto');

const hashResetCode = (resetCode) =>
    crypto
        .createHash("sha256")
        .update(resetCode)
        .digest("hex");

module.exports = hashResetCode