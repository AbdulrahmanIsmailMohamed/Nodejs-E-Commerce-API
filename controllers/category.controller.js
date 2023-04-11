/* eslint-disable no-undef */
const { v4: uuidv4 } = require("uuid")
const sharp = require("sharp");

const Category = require("../models/Categories");
const asyncHandler = require("../middlewares/asyncHandler");

const { uploadSingleImage } = require("../middlewares/multer");

const {
    createOne,
    deleteOne,
    getAll,
    updateOne,
    getOne
} = require("./handlerFactory");


// multer
const uploadImage = uploadSingleImage();

// image processing
const resizeImage = asyncHandler(async (req, res, next) => {
    if (req.file) {
        const filename = `category--${uuidv4()}--${Date.now()}.jpeg`;
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/categories/${filename}`);

        // Save image into our db
        req.body.image = filename;
    }
    next();
});

/**
    @access private
*/
const createCategory = createOne(Category)

/**
    @access public 
*/
const getAllcategories = getAll(Category)

/**
    @access public
*/
const getCategory = getOne(Category)

/**
    @access private
*/
const updateCategory = updateOne(Category)

/**
    @access private
*/
const deleteCategory = deleteOne(Category)


module.exports = {
    createCategory,
    getAllcategories,
    updateCategory,
    getCategory,
    deleteCategory,
    uploadImage,
    resizeImage
}