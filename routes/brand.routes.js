const router = require("express").Router();

const { protectRoute } = require("../config/auth");
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
        protectRoute,
        uploadImage,
        resizeImage,
        createBrandValidator,
        createBrand
    )
    .get(getBrands);

router
    .route("/:id")
    .patch(
        protectRoute,
        uploadImage,
        resizeImage,
        updateBrandValidator,
        updateBrand
    )
    .delete(
        protectRoute,
        brandIdValidator,
        deleteBrand
    )
    .get(brandIdValidator, getBrand);

module.exports = router;