const slugify = require("slugify");
const { check } = require("express-validator");
const validatorMW = require("../../middlewares/validatorMW");
const Category = require("../../models/Categories");
const Product = require("../../models/Product");
const SubCategory = require("../../models/Sub-Category");

const productIdValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid Category Id Format!"),
    validatorMW
]

const createProductValidator = [
    check('title')
        .isLength({ min: 3 })
        .withMessage('must be at least 3 chars')
        .isLength({ max: 100 })
        .withMessage('must be less than 100 characters')
        .notEmpty()
        .withMessage('Product required')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),

    check('description')
        .notEmpty()
        .withMessage('Product description is required')
        .isLength({ max: 2000 })
        .withMessage('Too long description'),

    check('modelName')
        .optional()
        .notEmpty()
        .withMessage('Product model name is not must be null')
        .isLength({ min: 2 })
        .withMessage("must be at least 2 characters")
        .isLength({ max: 30 })
        .withMessage('Too long modelName'),

    check('quantity')
        .optional()
        .notEmpty()
        .withMessage('Product quantity is not must be null')
        .isNumeric()
        .withMessage('Product quantity must be a number'),

    check('sold')
        .optional()
        .isNumeric()
        .withMessage('Product quantity must be a number'),

    check('price')
        .notEmpty()
        .withMessage('Product price is required')
        .isNumeric()
        .withMessage('Product price must be a number')
        .custom((val) => {
            if (val <= 0) return false
            return true
        })
        .withMessage('To less price')
        .isLength({ max: 10 })
        .withMessage('To long price'),

    check('priceAfterDiscount')
        .optional()
        .isNumeric()
        .withMessage('Product priceAfterDiscount must be a number')
        .toFloat()
        .custom((value, { req }) => {
            if (req.body.price <= value) {
                throw new Error('priceAfterDiscount must be lower than price');
            }
            return true;
        }),

    check('colors')
        .optional()
        .isArray()
        .withMessage('availableColors should be array of string'),

    check('imageCover')
        .notEmpty()
        .withMessage('Product imageCover is required'),

    check('images')
        .optional()
        .isArray()
        .withMessage('images should be array of string'),

    check('category')
        .notEmpty()
        .withMessage('Product must be belong to a category')
        .isMongoId()
        .withMessage('Invalid ID formate')
        .custom(async (categoryId) => {
            try {
                const category = await Category.findById(categoryId)
                if (!category) {
                    return Promise.reject(
                        new Error(`No category for this id: ${categoryId}`)
                    );
                }
                return true;
            } catch (err) {
                console.log(err);
            }
        }),

    check('subCategories')
        .optional()
        .isMongoId()
        .withMessage('Invalid ID formate')
        .custom(async (subCategoriesIds) => {
            try {
                const subCategory = await SubCategory.find({ _id: { $exists: true, $in: subCategoriesIds } })
                console.log(subCategory);
                if (!subCategory) return Promise.reject(new Error(`Sub-Categories Ids Not Found`));
                if (subCategory.length < 1 || subCategory.length !== subCategoriesIds.length) {
                    return Promise.reject(new Error(`Invalid subcategories Ids`));
                }
                return true
            } catch (err) {
                console.log(err);
            }
        })

        .custom(async (subCategoriesIds, { req }) => {
            try {
                const subCategories = await SubCategory.find({ category: req.body.category });
                if (!subCategories) return Promise.reject(new Error("Categories Not Found"));
                const subCategoriesIdsInDB = [];
                subCategories.forEach((subCategory) => {
                    subCategoriesIdsInDB.push(subCategory._id.toString())
                });
                const checker = subCategoriesIds.every((val) => subCategoriesIdsInDB.includes(val));
                if (!checker) return Promise.reject(new Error("subcategories not belong to category"));
                return true
            } catch (err) {
                console.log(err);
            }
        }),

    check('brand')
        .optional()
        .isMongoId()
        .withMessage('Invalid ID formate'),

    check('ratingsAverage')
        .optional()
        .isNumeric()
        .withMessage('ratingsAverage must be a number')
        .isLength({ min: 1 })
        .withMessage('Rating must be above or equal 1.0')
        .isLength({ max: 5 })
        .withMessage('Rating must be below or equal 5.0'),

    check('ratingsQuantity')
        .optional()
        .isNumeric()
        .withMessage('ratingsQuantity must be a number'),

    validatorMW
]

const updateProductValidator = [
    check('title')
        .optional()
        .isLength({ min: 3 })
        .withMessage('must be at least 3 chars')
        .isLength({ max: 100 })
        .withMessage('must be less than 100 characters')
        .notEmpty()
        .withMessage('Product Title is not must be null')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),

    check('description')
        .optional()
        .notEmpty()
        .withMessage('Product description is not must be null')
        .isLength({ max: 2000 })
        .withMessage('Too long description'),

    check('modelName')
        .optional()
        .notEmpty()
        .withMessage('Product model name is not must be null')
        .isLength({ min: 2 })
        .withMessage("must be at least 2 characters")
        .isLength({ max: 30 })
        .withMessage('Too long modelName'),

    check('quantity')
        .optional()
        .notEmpty()
        .withMessage('Product quantity is not must be null')
        .isNumeric()
        .withMessage('Product quantity must be a number'),

    check('sold')
        .optional()
        .isNumeric()
        .withMessage('Product quantity must be a number'),

    check('price')
        .optional()
        .notEmpty()
        .withMessage('Product price is not must be null')
        .isNumeric()
        .withMessage('Product price must be a number')
        .custom((val) => {
            if (val <= 0) return false
            return true
        })
        .withMessage('To less price')
        .isLength({ max: 10 })
        .withMessage('To long price'),

    check('priceAfterDiscount')
        .optional()
        .isNumeric()
        .withMessage('Product priceAfterDiscount must be a number')
        .toFloat()
        .custom((value, { req }) => {
            if (req.body.price <= value) {
                throw new Error('priceAfterDiscount must be lower than price');
            }
            return true;
        }),

    check('colors')
        .optional()
        .isArray()
        .withMessage('availableColors should be array of string'),

    check('imageCover')
        .optional()
        .notEmpty()
        .withMessage('Product imageCover is not must be null'),

    check('images')
        .optional()
        .isArray()
        .withMessage('images should be array of string'),

    check('category')
        .optional()
        .notEmpty()
        .withMessage('Product must be belong to a category')
        .isMongoId()
        .withMessage('Invalid ID formate')
        .custom(async (categoryId) => {
            try {
                const category = await Category.findById(categoryId);
                if (!category) return Promise.reject(new Error("The Category Not Found"));
                return true
            } catch (err) {
                console.log(err);
            }
        }),

    check('subCategories')
        .optional()
        .isMongoId()
        .withMessage('Invalid ID formate')
        .custom(async (subcategoriesIds) => {
            try {
                const subCategory = await SubCategory.find({ _id: { $exists: true, $in: subcategoriesIds } });
                if (!subCategory) return Promise.reject(new Error("The Sub-subCategoriesIds Not Found!!"));
                if (subCategory.length < 1 || subCategory.length !== subcategoriesIds.length) {
                    return Promise.reject(new Error(`Invalid subcategories Ids`));
                }
                return true;
            } catch (err) {
                console.log(err);
            }
        })

        .custom(async (subCategoriesIds, { req }) => {
            if (!req.body.category) {
                const product = await Product.findById(req.params.id);
                req.body.category = product.category
                console.log(product);
            }
            const subCategories = await SubCategory.find({ category: req.body.category });
            console.log(subCategories);
            if (!subCategories) return Promise.reject(new Error("There is no sub-category belonging to this category"))
            const subCategoriesIdsInDB = [];
            subCategories.forEach((subCategory) => {
                subCategoriesIdsInDB.push(subCategory._id.toString());
            });
            const checker = subCategoriesIds.every((val) => subCategoriesIdsInDB.includes(val));
            if (!checker) return Promise.reject(new Error("subcategories not belong to category"));
            return true;
        }),

    check('brand')
        .optional()
        .isMongoId()
        .withMessage('Invalid ID formate'),

    check('ratingsAverage')
        .optional()
        .isNumeric()
        .withMessage('ratingsAverage must be a number')
        .isLength({ min: 1 })
        .withMessage('Rating must be above or equal 1.0')
        .isLength({ max: 5 })
        .withMessage('Rating must be below or equal 5.0'),

    check('ratingsQuantity')
        .optional()
        .isNumeric()
        .withMessage('ratingsQuantity must be a number'),

    validatorMW
]

module.exports = {
    productIdValidator,
    updateProductValidator,
    createProductValidator
}