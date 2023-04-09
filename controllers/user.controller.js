const bcrypt = require("bcrypt")

const User = require("../models/user");
const imageProcessing = require("../middlewares/imageProcessingMW");
const asyncHandler = require("../middlewares/asyncHandler");
const APIError = require("../util/APIError");

const { uploadSingleImage } = require("../middlewares/multer");
const {
    createOne,
    getOne,
    getAll,
    deleteOne
} = require("./handlerFactory");


// multer
const uploadUserImage = uploadSingleImage("imgProfile");

// Image Processing
const resizeImage = imageProcessing("user", "users", "imgProfile");

/**
    @access private
*/
const createUser = createOne(User);

/**
    @access private
*/
const updateUser = asyncHandler(async (req, res, next) => {
    delete req.body.password;
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return next(new APIError("The User Can't Be Updated!!"));
    res.status(200).json({ success: true, User: user });
})

/**
@access public
*/
const changePassword = asyncHandler(async (req, res, next) => {
    const password = bcrypt.hashSync(req.body.password, 12);
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { password },
        { new: true }
    );
    if (!user) return next(new APIError("Your Password Can't Be Updated!!"));
    res.status(200).json({ success: true, User: user });
});

/**
@access public
*/
const getUser = getOne(User);

/**
    @access public
*/
const getUsers = getAll(User);

/**
    @access private
*/
const deleteUser = deleteOne(User)

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getUsers,
    resizeImage,
    uploadUserImage,
    changePassword
}