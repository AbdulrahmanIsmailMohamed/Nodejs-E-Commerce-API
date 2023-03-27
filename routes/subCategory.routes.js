const router = require('express').Router();

const {
    createSubCategory,
    getSubCategories,
    updateSubCategory,
    deleteSubCategory,
    getSubCategory
} = require('../controllers/subCategory.controller');

const {
    createSubCategoryValidator,
    updateSubCategoryValidator,
    subCategoryIdValidator
} = require('../util/validator/subCategoryValidator');


router
    .route("/")
    .post(createSubCategoryValidator, createSubCategory)
    .get(getSubCategories)

router
    .route("/:id")
    .get(subCategoryIdValidator, getSubCategory)
    .patch(updateSubCategoryValidator, updateSubCategory)
    .delete(subCategoryIdValidator, deleteSubCategory);

module.exports = router;