const router = require("express").Router();

const {
    getProducts,
    createProduct,
    updateProduct,
    getProduct,
    deleteProduct
} = require("../controllers/product.controller")

router
    .route("/")
    .get(getProducts)
    .post(createProduct)

router
    .route("/:id")
    .patch(updateProduct)
    .delete(deleteProduct)
    .get(getProduct)

module.exports = router;