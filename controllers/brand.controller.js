/* eslint-disable prefer-const */
const slugify = require("slugify");
const Brand = require("../models/Brand")
const asyncHandler = require("../middlewares/asyncHandler");
const APIError = require("../util/APIError")

/**
    @access private
*/
const createBrand = asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    const brand = await Brand.create({ name, slug: slugify(name) });
    if (!brand) return next(new APIError("The Brand Can't Be Created!!", 400));
    res.status(201).json({
        success: true,
        Brand: brand
    })
});

/**
    @access private
*/
const updateBrand = asyncHandler(async (req, res, next) => {
    const query = await Brand.findById(req.params.id);
    if (!req.body.name) req.body.name = query.name;

    const { name } = req.body;
    const brand = await Brand.findByIdAndUpdate(
        req.params.id,
        {
            name,
            slug: slugify(name)
        },
        { new: true }
    );
    if (!brand) return next(new APIError("The Brand Can't Be Updated!!", 400));
    res.status(200).json({
        success: true,
        Brand: brand
    });
});

/**
    @access public
*/
const getBrand = asyncHandler(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return next(new APIError("The Brand Can't Be Found!!", 404));
    res.status(200).json({
        success: true,
        Brand: brand
    });
});

/**
    @access public
*/
const getBrands = asyncHandler(async (req, res, next) => {
    let page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 5;
    let skip = (page - 1) * limit

    const brands = await Brand.find().skip(skip).limit(limit);
    if (!brands) return next(new APIError("The Brand Can't Be Found!!", 404));
    res.status(200).json({
        success: true,
        result: brands.length,
        Brands: brands
    });
});

/**
    @access private
*/
const deleteBrand = asyncHandler(async (req, res, next) => {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) return next(new APIError("The Brand Can't Be Found!!", 404));
    res.status(200).json({ success: true });
})


module.exports = {
    createBrand,
    updateBrand,
    getBrand,
    getBrands,
    deleteBrand
}