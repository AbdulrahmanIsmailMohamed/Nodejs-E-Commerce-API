const router = require("express").Router();

const reviewRoutes = require("./review.routes");

const {
    protectRoute,
    allowTo
} = require("../config/auth");
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

router.use("/:productId/reviews", reviewRoutes)

router
    .route("/")
    .get(getProducts)
    .post(
        protectRoute,
        allowTo("admin", "manager"),
        uploadMultiImages,
        imageProcessing,
        createProductValidator,
        createProduct
    )

router
    .route("/:id")
    .patch(
        protectRoute,
        allowTo("admin", "manager"),
        uploadMultiImages,
        imageProcessing,
        updateProductValidator,
        updateProduct
    )
    .delete(
        protectRoute,
        allowTo("admin", "manager"),
        productIdValidator,
        deleteProduct
    )
    .get(productIdValidator, getProduct)

module.exports = router;