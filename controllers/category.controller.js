/* eslint-disable no-undef */
const slugify = require("slugify");
const Category = require("../models/Categories");
const asyncHandler = require("../middlewares/asyncHandler");
const APIError = require("../util/APIError");
const APIFeature = require("../util/APIFeatures");

/**
    @access private
*/
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await Category.create({ name, slug: slugify(name) });
    if (!category) return next(new APIError("The Category Can't Be Created!", 400));
    res.status(201).json({ success: true, category: category })
});

/**
    @access public 
*/
const getAllcategories = asyncHandler(async (req, res) => {
    // // pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 5;
    // const skip = (page - 1) * limit;

    // const categories = await Category.find().skip(skip).limit(limit);
    // if (!categories) return next(new APIError("The Categories Not Found!", 404));
    // res.status(200).json({ result: categories.length, page: page, categories: categories })

    const countDocument = await Category.countDocuments()
    const apiFeature = new APIFeature(Category.find(), req.query)
        .filter()
        .pagination(countDocument)
        .search()
        .limiting()
        .sort()

    const { mongooseQuery, paginationResult } = apiFeature
    const categories = await mongooseQuery;
    if (!categories) return next(new APIError("The Categories Not Found"))
    res.status(200).json({
        success: true,
        result: categories.length,
        paginationResult: paginationResult,
        Categories: categories,
    });
})

/**
    @access public
*/
const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) return next(new APIError("The Category Not Found!", 404));
    res.status(200).json({ success: true, category: category });
});

/**
    @access private
*/
const updateCategory = asyncHandler(async (req, res) => {
    const query = await Category.findById(req.params.id);
    if (!req.body.name) req.body.name = query.name;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name,
            slug: slugify(name)
        },
        { new: true }
    );
    // eslint-disable-next-line no-undef
    if (!category) return next(new APIError("The Category Not Found!", 404));
    res.status(200).json({ success: true, category: category });
});

/**
    @access private
*/
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id);
    if (!category) return next(new APIError("The Category Not Found!", 404));
    res.status(200).json({ success: true });
});


module.exports = {
    createCategory,
    getAllcategories,
    updateCategory,
    getCategory,
    deleteCategory
}