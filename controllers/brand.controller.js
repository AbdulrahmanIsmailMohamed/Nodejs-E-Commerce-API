const Brand = require("../models/Brand")

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
const createBrand = createOne(Brand);

/**
    @access private
*/
const updateBrand = updateOne(Brand);

/**
    @access public
*/
const getBrand = getOne(Brand);

/**
    @access public
*/
const getBrands = getAll(Brand);

/**
    @access private
*/
const deleteBrand = deleteOne(Brand)


module.exports = {
    createBrand,
    updateBrand,
    getBrand,
    getBrands,
    deleteBrand
}