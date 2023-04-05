const router = require("express").Router();

const {
    getProducts,
    createProduct,
    updateProduct,
    getProduct,
    deleteProduct,
    uploadMultiImages,
    imageProcessing
} = require("../controllers/product.controller");

const {
    createProductValidator,
    updateProductValidator,
    productIdValidator
} = require("../util/validator/productValidator");

router
    .route("/")
    .get(getProducts)
    .post(
        uploadMultiImages,
        imageProcessing,
        createProductValidator,
        createProduct
    )

router
    .route("/:id")
    .patch(
        uploadMultiImages,
        imageProcessing,
        updateProductValidator,
        updateProduct
    )
    .delete(productIdValidator, deleteProduct)
    .get(productIdValidator, getProduct)

module.exports = router;