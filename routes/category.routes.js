const router = require("express").Router();
const subCategoryRoutes = require("./subCategory.routes");

const {
    createCategory,
    getAllcategories,
    updateCategory,
    getCategory,
    deleteCategory,
    uploadSingleImage,
    imageProcess
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
        uploadSingleImage,
        imageProcess,
        createCategoryValidator,
        createCategory
    )
    .get(getAllcategories);

router
    .route("/:id")
    .patch(
        uploadSingleImage,
        imageProcess,
        updateCategoryValidator,
        updateCategory
    )
    .get(categoryIdValidator, getCategory)
    .delete(deleteCategory, deleteCategory);

module.exports = router