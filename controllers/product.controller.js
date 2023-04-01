const asyncHandler = require('../middlewares/asyncHandler');
const Product = require("../models/Product");
const APIError = require("../util/APIError");
const APIFeature = require("../util/APIFeatures");

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
    const mongooseQuery = Product.find().populate("category", "name");
    const apiFeature = new APIFeature(mongooseQuery, req.query)
        .filter()
        .pagination()
        .search()
        .limiting()
        .sort()

    const products = await apiFeature.mongooseQuery;
    if (!products) return next(new APIError("The Products Not Found"))
    res.status(200).json({
        success: true,
        result: products.length,
        products,
    });
});

const getProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
        .populate("category", "name -_id")
        .populate("subCategories", "name -_id");
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