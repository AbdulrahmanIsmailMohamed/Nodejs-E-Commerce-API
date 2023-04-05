/* eslint-disable no-undef */
const Category = require("../models/Categories");
const { uploadSingleImage } = require("../middlewares/multer");
const imageProcessing = require("../middlewares/imageProcessingMW")

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
const imageProcess = imageProcessing("category", "categories");

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
    imageProcess
}