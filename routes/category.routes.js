const router = require("express").Router();
const {
    createCategory,
    getAllcategories,
    updateCategory,
    getCategory,
    deleteCategory
} = require("../controllers/category.controller");

const {
    categoryIdValidator,
    createCategoryValidator,
    updateCategoryValidator
} = require("../util/validator/categoryValidator");

router
    .route('/')
    .post(createCategoryValidator, createCategory)
    .get(getAllcategories);

router
    .route("/:id")
    .patch(updateCategoryValidator, updateCategory)
    .get(categoryIdValidator, getCategory)
    .delete(deleteCategory, deleteCategory);

module.exports = router