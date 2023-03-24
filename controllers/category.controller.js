const Category = require("../models/Categories");
const asyncHandler = require("../middlewares/asyncHandler");
const slugify = require("slugify");

/**
    @access public
*/
const createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const category = await Category.create({ name, slag: slugify(name) });
    if (!category) {
        return res
            .status(400)
            .json({ success: false, message: "The Category Can't Be Created" });
    }
    res.status(201).json({ success: true, category: category })
});

/**
    @access private 
*/
const getAllcategories = asyncHandler(async (req, res) => {
    // pagination
    let page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 5;
    let skip = (page - 1) * limit;

    const categories = await Category.find().skip(skip).limit(limit);
    if (!categories) {
        return res
            .status(404)
            .json({ success: false, message: "The Categories Not Found" });
    }
    res.status(200).json({ result: categories.length, page: page, categories: categories })
})

/**
    @access public
*/
const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return res
            .status(404)
            .json({ success: false, message: "The Categories Not Found" });
    }
    res.status(200).json({ success: true, category: category });
});

/**
    @access private
*/
const updateCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const name = req.body.name;
    const category = await Category.findByIdAndUpdate(
        { _id: id },
        {
            name,
            slag: slugify(name)
        },
        { new: true }
    );
    if (!category) {
        return res
            .status(404)
            .json({ success: false, message: "The Categories Not Found" });
    }
    res.status(200).json({ success: true, category: category });
});

/**
@access private
*/
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id);
    if (!category) {
        return res
            .status(404)
            .json({ success: false, message: "The Categories Not Found" });
    }
    res.status(200).json({ success: true });
});


module.exports = {
    createCategory,
    getAllcategories,
    updateCategory,
    getCategory,
    deleteCategory
}