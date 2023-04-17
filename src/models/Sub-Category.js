const mongoose = require('mongoose');


const subCategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "The name of the category Must be required"],
            unique: [true, "The name of the category must be unique"],
            minLength: [2, "The name must be at least 2 characters long"],
            maxLength: [32, "The name must be at most 32 characters long"],
            trim: true
        },
        slug: {
            type: String,
            lowercase: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, "The id of the category must be required"],
        }
    },
    { timestamps: true }
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory