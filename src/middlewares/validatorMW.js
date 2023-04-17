const { validationResult } = require("express-validator");

const validatorMW = (req, res, nxt) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ err: errors.array() })
    }
    nxt()
}

module.exports = validatorMW