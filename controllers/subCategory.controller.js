/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
const slugify = require('slugify');
const asyncHandler = require("../middlewares/asyncHandler");
const SubCategory = require("../models/Sub-Category");
const APIError = require("../util/APIError");

// middleware to set categoryid in req.body
const setCategoryId = (req, res, next) => {
    if (req.params.categoryId) req.body.category = req.params.categoryId;
    next()
}

/**
    @access private
*/
const createSubCategory = asyncHandler(async (req, res, next) => {
    const { name, category } = req.body
    const subCategory = await SubCategory.create({ name, category, slug: slugify(name) });
    if (!subCategory) return next(new APIError("Sub-Category Not Created!!", 400));
    res.status(201).json({ subCategory: subCategory });
});

/**
    @access private
*/
const updateSubCategory = asyncHandler(async (req, res, next) => {
    const { name, category } = req.body;
    const subCategory = await SubCategory.findByIdAndUpdate(
        req.params.id,
        {
            name,
            category,
            slug: slugify(name)
        },
        { new: true }
    );
    if (!subCategory) return next(new APIError("Sub-Category Not Found!!", 400));
    res.status(200).json({ subCategory: subCategory });
});

/**
    @access private
*/
const deleteSubCategory = asyncHandler(async (req, res, next) => {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory) return next(new APIError("Sub-Category Not Found!!", 400));
    res.status(200).json({ success: true });
});

/**
    @access publuc
*/
const getSubCategory = asyncHandler(async (req, res, next) => {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) return next(new APIError("Sub-Category Not Found", 404));
    res.status(200).json({ subCategory: subCategory });
});

/**
    @access private
*/
const getSubCategories = asyncHandler(async (req, res, next) => {
    const limit = req.query.limit || 5;
    const page = req.query.page * 1 || 1;
    const skip = (page - 1) * limit;
    // nested category
    let filter = {}
    if (req.params.categoryId) filter = { category: req.params.categoryId }
    const subCategories = await SubCategory.find(filter).skip(skip).limit(limit)
        .populate("category", "name -_id");
    if (!subCategories) return next(new APIError("The SubCategories is Not Found", 400));
    res.status(200).json({
        result: subCategories.length,
        subCategories: subCategories
    });
})

module.exports = {
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getSubCategories,
    getSubCategory,
    setCategoryId
}