const Category = require("../models/Categories");
const asyncWrapper = require("../middlewares/async")

const createCategory = asyncWrapper(async (req, res) => {
    const category = await Category.create(req.body);
    if (!category) return res.status(400).json({ success: false, message: "The Category Can't Be Created" });
    res.status(201).json({ success: true, category: category })
})

module.exports = {
    createCategory
}