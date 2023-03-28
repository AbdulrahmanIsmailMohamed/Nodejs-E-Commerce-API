const mongoose = require("mongoose");

const brandSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Brand is required'],
            unique: [true, "Brand must be unique"],
            minLength: [3, `{VALUE} is short Brand name`],
            maxLength: [32, `{VALUE} is long Brand name`]
        },
        slug: {
            type: String,
            lowercase: true
        }
    },
    { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;