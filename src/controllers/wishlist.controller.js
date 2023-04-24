const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/user");
const APIError = require("../util/APIError");

const addProductToWishlist = asyncHandler(async (req, res, next) => {
    const wishlist = await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: { wishList: req.body.productId }
        },
        { new: true }
    );
    if (!wishlist) return next(new APIError("The WishList Can't Be Updated!!", 400));
    res.status(200).json({ success: true, Data: wishlist });
});

const removeProductFromWishlist = asyncHandler(async (req, res, next) => {
    const wishlist = await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: { wishList: req.params.productId }
        },
        { new: true }
    );
    if (!wishlist) return next(new APIError("The WishList Can't Be Updated!!", 400));
    res.status(200).json({ success: true, data: wishlist });
});

const getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("wishList");
    if (!user) return next(new APIError("The user Not Found", 404));
    res
        .status(200)
        .json({ success: true, result: user.wishList.length, wishList: user.wishList });
})

module.exports = {
    addProductToWishlist,
    removeProductFromWishlist,
    getLoggedUserWishlist
};