const router = require("express").Router();

const {
    createBrand,
    getBrands,
    updateBrand,
    deleteBrand,
    getBrand,
    uploadImage,
    resizeImage
} = require("../controllers/brand.controller");

const {
    createBrandValidator,
    updateBrandValidator,
    brandIdValidator
} = require("../util/validator/brandValidator")

router
    .route("/")
    .post(
        uploadImage,
        resizeImage,
        createBrandValidator,
        createBrand
    )
    .get(getBrands);

router
    .route("/:id")
    .patch(
        uploadImage,
        resizeImage,
        updateBrandValidator,
        updateBrand
    )
    .delete(deleteBrand)
    .get(brandIdValidator, getBrand);

module.exports = router;