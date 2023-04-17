const router = require("express").Router();
const subCategoryRoutes = require("./subCategory.routes");

const {
    protectRoute,
    allowTo
} = require("../config/auth");
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
        allowTo("admin", "manager"),
        uploadImage,
        resizeImage,
        createCategoryValidator,
        createCategory
    )
    .get(getAllcategories);

router
    .route("/:id")
    .patch(
        protectRoute,
        allowTo("admin", "manager"),
        uploadImage,
        resizeImage,
        updateCategoryValidator,
        updateCategory
    )
    .get(categoryIdValidator, getCategory)
    .delete(
        protectRoute,
        allowTo("admin", "manager"),
        deleteCategory,
        deleteCategory
    );

module.exports = router