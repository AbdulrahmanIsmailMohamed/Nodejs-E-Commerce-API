const User = require("../models/user");
const asyncHandler = require("../middlewares/asyncHandler");
const APIError = require("../util/APIError");

const createAddress = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: { addresses: req.body }
        },
        { new: true }
    );
    if (!user) return next(new APIError("The Address Can't Be Updated!!", 400));
    res.status(201).json({ success: true, user });
});

const deleteAddress = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: { addresses: { _id: req.params.addressId } }
        },
        { new: true }
    );
    if (!user) return next(new APIError("The Address Can't Be Deleted!!", 400));
    res.status(204).json({ success: true });
});

const getLoggedUserAdresses = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("addresses");
    if (!user) return next(new APIError("The Address Can't Be Updated!!", 400));
    res
        .status(200)
        .json({ success: true, result: user.length, Addresses: user });
});

module.exports = {
    createAddress,
    deleteAddress,
    getLoggedUserAdresses
}