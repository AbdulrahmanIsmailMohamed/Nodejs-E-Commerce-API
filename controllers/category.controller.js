/* eslint-disable no-undef */
const Category = require("../models/Categories");

const {
    createOne,
    deleteOne,
    getAll,
    updateOne,
    getOne
} = require("./handlerFactory");


/**
    @access private
*/
const createCategory = createOne(Category)

/**
    @access public 
*/
const getAllcategories = getAll(Category)

/**
    @access public
*/
const getCategory = getOne(Category)

/**
    @access private
*/
const updateCategory = updateOne(Category)

/**
    @access private
*/
const deleteCategory = deleteOne(Category)


module.exports = {
    createCategory,
    getAllcategories,
    updateCategory,
    getCategory,
    deleteCategory
}