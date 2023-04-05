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
        },
        image: {
            type: String
        }
    },
    { timestamps: true }
);


// * *middleware to set url in image and it start when to create brand

brandSchema.post("save", (doc) => {
    if (doc.image) {
        const baseurl = `${process.env.BASE_URL}${process.env.API}/brands/${doc.image}`;
        doc.image = baseurl
    }
})

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;