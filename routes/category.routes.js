const router = require("express").Router();
const {
    createCategory,
    getAllcategories,
    updateCategory,
    getCategory,
    deleteCategory
} = require("../controllers/category.controller");

router.route('/').post(createCategory).get(getAllcategories)

router.route("/:id").patch(updateCategory).get(getCategory).delete(deleteCategory)

module.exports = router