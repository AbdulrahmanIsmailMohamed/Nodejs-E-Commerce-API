const router = require("express").Router();

const {
    createBrand,
    getBrands,
    updateBrand,
    deleteBrand,
    getBrand,
    uploadImage,
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
        uploadImage,
        imageProcess,
        createBrandValidator,
        createBrand
    )
    .get(getBrands);

router
    .route("/:id")
    .patch(
        uploadImage,
        imageProcess,
        updateBrandValidator,
        updateBrand
    )
    .delete(deleteBrand)
    .get(brandIdValidator, getBrand);

module.exports = router;