// mergeParams: Allow us to access parameters on another routes
// exam: we need to access categoryId From category routes
const router = require('express').Router({ mergeParams: true });

const { protectRoute } = require('../config/auth');
const {
    createSubCategory,
    getSubCategories,
    updateSubCategory,
    deleteSubCategory,
    getSubCategory,
    setCategoryId
} = require('../controllers/subCategory.controller');

const {
    createSubCategoryValidator,
    updateSubCategoryValidator,
    subCategoryIdValidator
} = require('../util/validator/subCategoryValidator');

router
    .route("/")
    .post(
        protectRoute,
        setCategoryId,
        createSubCategoryValidator,
        createSubCategory
    )
    .get(getSubCategories)

router
    .route("/:id")
    .get(subCategoryIdValidator, getSubCategory)
    .patch(
        protectRoute,
        updateSubCategoryValidator,
        updateSubCategory
    )
    .delete(
        protectRoute,
        subCategoryIdValidator,
        deleteSubCategory
    );

module.exports = router;