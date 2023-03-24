const router = require("express").Router();
const {
    createCategory
} = require("../controllers/category.controller");



router.post('/', createCategory)


module.exports = router