const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Category is required'],
            unique: [true, "Category must be unique"],
            minLength: [3, `{VALUE} is short category name`],
            maxLength: [32, `{VALUE} is long category name`]
        },
        // a and be => shopping.com/a-and-b
        slag: {
            type: String,
            lowercase: true
        }
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;