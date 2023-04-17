const jwt = require("jsonwebtoken");

const asyncHandling = require("../middlewares/asyncHandler");
const User = require("../models/user")
const APIError = require("../util/APIError");

const protectRoute = asyncHandling(async (req, res, next) => {
    // 1) Check if token exist, if exist get
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new APIError("You're Not Registerd, Please Login!!", 401));
    }

    // 2) Verify token (no change happens, expired token)
    const decode = jwt.verify(token, process.env.JWT_SEC);

    // 3) Check if user exists
    const { userId } = decode;
    const user = await User.findById(userId);
    if (!user) return next(new APIError("The User That Belongs To This Token, Does No Longer Exist", 401));

    // 4) Check if user change his password after token created
    if (user.changePasswordAt) {
        const passwordTimeStamp = parseInt(user.changePasswordAt.getTime() / 1000, 10)
        if (passwordTimeStamp > decode.iat) {
            return next(new APIError("User Recently Changed Password, Please Login Again!!", 401));
        }
    }
    req.user = user;
    next();
});

const allowTo = (...roles) =>
    asyncHandling(async (req, res, next) => {
        console.log(req.user.role);
        if (!roles.includes(req.user.role)) {
            // res.redirect(`${process.env.API}/products`);
            return next(
                new APIError('You are not allowed to access this route', 403)
            );
        }
        next();
    })

module.exports = {
    protectRoute,
    allowTo
}