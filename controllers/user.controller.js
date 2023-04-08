const User = require("../models/user");
const imageProcessing = require("../middlewares/imageProcessingMW");

const { uploadSingleImage } = require("../middlewares/multer");
const {
    createOne,
    updateOne,
    getOne,
    getAll,
    deleteOne
} = require("./handlerFactory");

// multer
const uploadUserImage = uploadSingleImage("imgProfile");

// Image Processing
const resizeImage = imageProcessing("user","users","imgProfile");

/**
    @access private
*/
const createUser = createOne(User);

/**
    @access private
*/
const updateUser = updateOne(User);

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
    uploadUserImage
}