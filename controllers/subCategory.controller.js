/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
const slugify = require('slugify');
const asyncHandler = require("../middlewares/asyncHandler");
const SubCategory = require("../models/Sub-Category");
const APIError = require("../util/APIError");
const APIFeature = require('../util/APIFeatures');

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
    const countDocument = await SubCategory.countDocuments()
    const apiFeature = new APIFeature(SubCategory.find(), req.query)
        .filter()
        .pagination(countDocument)
        .search()
        .limiting()
        .sort()

    const { mongooseQuery, paginationResult } = apiFeature;
    const subCategories = await mongooseQuery;
    if (!subCategories) return next(new APIError("The SubCategories Not Found"))
    res.status(200).json({
        success: true,
        result: subCategories.length,
        paginationResult: paginationResult,
        SubCategories: subCategories,
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