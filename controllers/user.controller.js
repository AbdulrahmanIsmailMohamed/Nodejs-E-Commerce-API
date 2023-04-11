const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const User = require("../models/user");
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
const resizeImage = asyncHandler(async (req, res, next) => {
    if (req.file) {

        const filename = `user--${uuidv4()}--${Date.now()}.jpeg`;
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/users/${filename}`);

        // Save image into our db
        const api = process.env.API
        const basePath = `${req.protocol}://${req.get('host')}${api}/users/${filename}`
        req.body.imgProfile = basePath;
    }
    next();
});
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
        {
            password,
            changePasswordAt: Date.now()
        },
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