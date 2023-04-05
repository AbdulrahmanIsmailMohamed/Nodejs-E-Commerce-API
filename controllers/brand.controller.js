const Brand = require("../models/Brand")
const { multerMW } = require("../middlewares/multer");
const imageProcessing = require("../middlewares/imageProcessingMW")

const {
    createOne,
    deleteOne,
    getAll,
    updateOne,
    getOne
} = require("./handlerFactory");

// multer
const uploadSingleImage = multerMW();

// image processing
const imageProcess= imageProcessing("brand","brands");

/**
    @access private
*/
const createBrand = createOne(Brand);

/**
    @access private
*/
const updateBrand = updateOne(Brand);

/**
    @access public
*/
const getBrand = getOne(Brand);

/**
    @access public
*/
const getBrands = getAll(Brand);

/**
    @access private
*/
const deleteBrand = deleteOne(Brand)


module.exports = {
    createBrand,
    updateBrand,
    getBrand,
    getBrands,
    deleteBrand,
    uploadSingleImage,
    imageProcess
}