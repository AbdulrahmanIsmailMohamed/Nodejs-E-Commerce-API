const router = require("express").Router();

const {
    getProducts,
    createProduct,
    updateProduct,
    getProduct,
    deleteProduct
} = require("../controllers/product.controller");

const {
    createProductValidator,
    updateProductValidator,
    productIdValidator
} = require("../util/validator/productValidator");

router
    .route("/")
    .get(getProducts)
    .post(createProductValidator, createProduct)

router
    .route("/:id")
    .patch(updateProductValidator, updateProduct)
    .delete(productIdValidator, deleteProduct)
    .get(productIdValidator, getProduct)

module.exports = router;