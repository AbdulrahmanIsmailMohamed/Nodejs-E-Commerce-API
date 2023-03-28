const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "The Title of the product is required"],
            trim: true,
            maxlength: [100, "The title must be less than 100 characters"],
            minlength: [3, "The title must be more than 3 characters"],
        },
        slug: {
            type: String,
            required: [true, "The slug of the product is required"],
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
            maxlength: [20, "The description must be less than 20 characters"],
        },
        modelName: {
            type: String,
            minlength: [2, "The Model Name of the product is must be at least 2 characters"],
            maxlength: [30, "The Model Name of the product is at most 30 characters"],
        },
        quantity: {
            type: Number,
            required: [true, "The quantity of the product is required"],
        },
        sold: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            trim: true,
            required: [true, "The price of the product is required"],
            min: [0, "The price of the product must be greater than 0"],
            max: [2000000, "The price of the product must be less than 2M"],
        },
        priceAfterDiscount: {
            type: Number
        },
        colors: [String],
        images: [String],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "The Product Must Be belong to a category"],
        },
        subCategories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubCategory",
            }
        ],
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
        },
        ratingsAverage: {
            type: Number,
            min: [1, "Ratings Average Must be above or equal to 1.0"],
            max: [5, "Ratings Average Must be below or equal to 5.0"],
        },
        ratingsQuantity: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;