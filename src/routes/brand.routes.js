const router = require("express").Router();

const {
    protectRoute,
    allowTo
} = require("../config/auth");
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
        allowTo("admin", "manager"),
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
        allowTo("admin", "manager"),
        uploadImage,
        resizeImage,
        updateBrandValidator,
        updateBrand
    )
    .delete(
        protectRoute,
        allowTo("admin", "manager"),
        brandIdValidator,
        deleteBrand
    )
    .get(brandIdValidator, getBrand);

module.exports = router;