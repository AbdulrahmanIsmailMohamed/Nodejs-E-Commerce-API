const SubCategory = require("../models/Sub-Category");

const {
    createOne,
    deleteOne,
    getAll,
    updateOne,
    getOne
} = require("./handlerFactory");

// middleware to set categoryid in req.body
const setCategoryId = (req, res, next) => {
    if (req.params.categoryId) req.body.category = req.params.categoryId;
    next()
}

/**
    @access private
*/
const createSubCategory = createOne(SubCategory);

/**
    @access private
*/
const updateSubCategory = updateOne(SubCategory);

/**
    @access private
*/
const deleteSubCategory = deleteOne(SubCategory);

/**
    @access publuc
*/
const getSubCategory = getOne(SubCategory);

/**
    @access private
*/
const getSubCategories = getAll(SubCategory);

module.exports = {
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getSubCategories,
    getSubCategory,
    setCategoryId
}