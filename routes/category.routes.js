const router = require("express").Router();
const subCategoryRoutes = require("./subCategory.routes");
const protectRoute = require("../config/auth");

const {
    createCategory,
    getAllcategories,
    updateCategory,
    getCategory,
    deleteCategory,
    uploadImage,
    resizeImage
} = require("../controllers/category.controller");

const {
    categoryIdValidator,
    createCategoryValidator,
    updateCategoryValidator
} = require("../util/validator/categoryValidator");

/**
* * Nested Route
* @UrlSource http://localhost:3333/api/v1/categories/:categoryId/sub-categories
*/
router.use("/:categoryId/sub-categories", subCategoryRoutes);

router
    .route('/')
    .post(
        protectRoute,
        uploadImage,
        resizeImage,
        createCategoryValidator,
        createCategory
    )
    .get(getAllcategories);

router
    .route("/:id")
    .patch(
        uploadImage,
        resizeImage,
        updateCategoryValidator,
        updateCategory
    )
    .get(categoryIdValidator, getCategory)
    .delete(deleteCategory, deleteCategory);

module.exports = router