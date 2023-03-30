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
    // filtration
    const queryObj = { ...req.query };
    const deleteQuery = ["limit", "page", "sort", "select"];
    deleteQuery.forEach((field) => delete queryObj[field]);

    // Apply Filtration Using [gte | gt | lte | lt]
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = limit * (page - 1);

    // Sorting
    let sortBy;
    if (req.query.sort) {
        sortBy = req.query.sort.split(",").join(" ")
    } else {
        sortBy = "-createAt"
    }

    // Limiting
    let selecteBy;
    if (req.query.select) {
        selecteBy = req.query.select.split(",").join(" ");
    } else {
        selecteBy = "-__v";
    }

    const products = await Product.find(JSON.parse(queryStr))
        .skip(skip)
        .limit(limit)
        .populate("category", "name -_id")
        .sort(sortBy)
        .select(selecteBy)

    if (!products) return next(new APIError("Products Not Found", 404));
    res.status(200).json({
        success: true,
        result: products.length,
        products: products,
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