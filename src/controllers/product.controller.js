const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid")

const { uploadFields } = require("../middlewares/multer");
const Product = require("../models/Product");
const APIError = require("../util/APIError");
const asyncHandler = require("../middlewares/asyncHandler");

const {
    createOne,
    deleteOne,
    getAll,
    updateOne,
    getOne
} = require("./handlerFactory");


// multer
const uploadMultiImages = uploadFields("imageCover", "images");

// Image Processing
const imageProcessing = asyncHandler(async (req, res, next) => {
    if (req.files.imageCover) {
        const uniqueSuffix = `product--${uuidv4()}--${Date.now()}--caver.jpeg`;
        await sharp(req.files.imageCover[0].buffer)
            .resize(1200, 1200)
            .toFormat("jpeg", { quality: 90 })
            // .jpeg({ quality: 90 })
            .toFile(`uploads/products/${uniqueSuffix}`);

        // save image into our db
        //* url: http://localhost:3333/api/v1/products/product--036615f5-c390-48fb-99ce-2d03330bb47f--1680570794277--cover.jpeg
        const api = process.env.API
        const basePath = `${req.protocol}://${req.get('host')}${api}/products/${uniqueSuffix}`;
        req.body.imageCover = basePath;
    }

    if (req.files.images) {
        const api = process.env.API;
        req.body.images = []
        await Promise.all(req.files.images.map(async (image, index) => {
            const uniqueSuffix = `product--${uuidv4()}--${Date.now()}--${index + 1}.jpeg`;
            await sharp(image.buffer)
                .resize(1200, 1200)
                .toFormat("jpeg", { quality: 90 })
                // .jpeg({ quality: 90 })
                .toFile(`uploads/products/${uniqueSuffix}`);

            // save image into our db
            //* url: http://localhost:3333/api/v1/products/product--036615f5-c390-48fb-99ce-2d03330bb47f--1680570794277--1.jpeg
            const basePath = `${req.protocol}://${req.get('host')}${api}/products/${uniqueSuffix}`;
            req.body.images.push(basePath)
        }));
    }
    else next(new APIError("Not Found Image", 400));
    next();
});

/**
    @access private
*/
const createProduct = createOne(Product);

/**
    @access private
*/
const updateProduct = updateOne(Product);

/**
    @access private
*/
const deleteProduct = deleteOne(Product);

/**
    @access public
*/
const getProducts = getAll(Product, "Products");

/**
    @access public
*/
const getProduct = getOne(Product, "reviews");

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProduct,
    uploadMultiImages,
    imageProcessing
}