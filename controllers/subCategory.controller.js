/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
const slugify = require('slugify');
const asyncHandler = require("../middlewares/asyncHandler");
const SubCategory = require("../models/Sub-Category");
const APIError = require("../util/APIError");

const createSubCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body
    if (req.body.slag) delete req.body.slag;
    const subCategory = await SubCategory.create({ ...req.body, slag: slugify(name) });
    if (!subCategory) return next(new APIError("Sub-Category Not Created!!", 400));
    res.status(201).json({ subCategory: subCategory });
});

const updateSubCategory = asyncHandler(async (req, res, next) => {
    const subCategory = await SubCategory.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (req.body.slag) delete req.body.slag;
    if (!subCategory) return next(new APIError("Sub-Category Not Found!!", 400));
    res.status(200).json({ subCategory: subCategory });
});

const deleteSubCategory = asyncHandler(async (req, res, next) => {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory) return next(new APIError("Sub-Category Not Found!!", 400));
    res.status(200).json({ success: true });
});

const getSubCategory = asyncHandler(async (req, res, next) => {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) return next(new APIError("Sub-Category Not Found", 404));
    res.status(200).json({ subCategory: subCategory });
});

const getSubCategories = asyncHandler(async (req, res, next) => {
    const limit = req.query.limit || 5;
    const page = req.query.page * 1 || 1;
    const skip = (page - 1) * limit;

    const subCategories = await SubCategory.find().skip(skip).limit(limit);
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
    getSubCategory
}