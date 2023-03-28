const router = require("express").Router();

const {
    createBrand,
    getBrands,
    updateBrand,
    deleteBrand,
    getBrand
} = require("../controllers/brand.controller");

const {
    createBrandValidator,
    updateBrandValidator,
    brandIdValidator
} = require("../util/validator/brandValidator")

router
    .route("/")
    .post(createBrandValidator, createBrand)
    .get(getBrands);

router
    .route("/:id")
    .patch(updateBrandValidator, updateBrand)
    .delete(deleteBrand)
    .get(brandIdValidator, getBrand);

module.exports = router;