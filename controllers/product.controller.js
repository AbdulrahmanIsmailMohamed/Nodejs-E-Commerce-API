const asyncHandler = require('../middlewares/asyncHandler');
const Product = require("../models/Product");
const APIError = require("../util/APIError");

const createProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.create(req.body);
    if (!product) return next(new APIError("Product Can't be created!!", 400));
    res.status(201).json({
        success: true,
        product: product,
    });
});

const updateProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!product) return next(new APIError("Product Not Found", 404));
    res.status(200).json({
        success: true,
        product: product,
    });
});

const deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return next(new APIError("Product Not Found", 404));
    res.status(204)
})

const getProducts = asyncHandler(async (req, res, next) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = limit * (page - 1);

    const products = await Product.find().skip(skip).limit(limit);
    if (!products) return next(new APIError("Products Not Found", 404));
    res.status(200).json({
        success: true,
        result: products.length,
        products: products,
    });
});

const getProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new APIError("Product Not Found", 404));
    res.status(200).json({
        success: true,
        product: product,
    });
});

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProduct
}