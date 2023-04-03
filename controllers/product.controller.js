const Product = require("../models/Product");

const {
    createOne,
    deleteOne,
    getAll,
    updateOne,
    getOne
} = require("./handlerFactory");

const createProduct = createOne(Product);

const updateProduct = updateOne(Product);

const deleteProduct = deleteOne(Product);

const getProducts = getAll(Product,"Products");

const getProduct = getOne(Product);

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProduct
}