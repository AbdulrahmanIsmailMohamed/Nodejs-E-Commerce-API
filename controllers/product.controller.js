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
    const mongooseQuerys = Product.find().populate("category", "name");
    const countDocument = await Product.countDocuments()
    const apiFeature = new APIFeature(mongooseQuerys, req.query)
        .filter()
        .pagination(countDocument)
        .search()
        .limiting()
        .sort()

    const { mongooseQuery, paginationResult } = apiFeature
    const products = await mongooseQuery;
    if (!products) return next(new APIError("The Products Not Found"))
    res.status(200).json({
        success: true,
        result: products.length,
        paginationResult: paginationResult,
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