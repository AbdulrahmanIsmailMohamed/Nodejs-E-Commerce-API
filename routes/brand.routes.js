const router = require("express").Router();

const {
    createBrand,
    getBrands,
    updateBrand,
    deleteBrand,
    getBrand,
    uploadSingleImage,
    imageProcess
} = require("../controllers/brand.controller");

const {
    createBrandValidator,
    updateBrandValidator,
    brandIdValidator
} = require("../util/validator/brandValidator")

router
    .route("/")
    .post(
        uploadSingleImage,
        imageProcess,
        createBrandValidator,
        createBrand
    )
    .get(getBrands);

router
    .route("/:id")
    .patch(
        uploadSingleImage,
        imageProcess,
        updateBrandValidator,
        updateBrand
    )
    .delete(deleteBrand)
    .get(brandIdValidator, getBrand);

module.exports = router;