const router = require("express").Router();

const {protectRoute} = require("../config/auth");
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
        protectRoute,
        uploadMultiImages,
        imageProcessing,
        createProductValidator,
        createProduct
    )

router
    .route("/:id")
    .patch(
        protectRoute,
        uploadMultiImages,
        imageProcessing,
        updateProductValidator,
        updateProduct
    )
    .delete(
        protectRoute,
        productIdValidator,
        deleteProduct
    )
    .get(productIdValidator, getProduct)

module.exports = router;