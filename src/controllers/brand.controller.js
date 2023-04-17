const { v4: uuidv4 } = require("uuid")
const sharp = require("sharp");

const Brand = require("../models/Brand")
const { uploadSingleImage } = require("../middlewares/multer");

const {
    createOne,
    deleteOne,
    getAll,
    updateOne,
    getOne
} = require("./handlerFactory");
const asyncHandler = require("../middlewares/asyncHandler");

// multer
const uploadImage = uploadSingleImage();

// image processing
const resizeImage = asyncHandler(async (req, res, next) => {
    if (req.file) {
        const filename = `brand--${uuidv4()}--${Date.now()}.jpeg`;
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/brands/${filename}`);

        // Save image into our db
        const api = process.env.API
        const basePath = `${req.protocol}://${req.get('host')}${api}/brands/${filename}`
        req.body.image = basePath;
    }
    next();
});

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
    uploadImage,
    resizeImage
}