const { Schema, model } = require("mongoose");
const Product = require("./Product")
const APIError = require("../util/APIError")

const reviewSchema = Schema(
    {
        title: {
            type: String
        },
        ratings: {
            type: Number,
            min: [1, "The rating is must be at least 1.0"],
            max: [5, "The rating is must be at Most 5.0"]
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "The User Id Is Required"]
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "The Product Id Is Required"]
        }
    },
    { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
    this.populate("userId", "name")
    next();
});

reviewSchema.post("save", async function () {
    await Review.calcAverageRatingsAndQuantity(this.product)
});

const Review = model("Review", reviewSchema);

Review.calcAverageRatingsAndQuantity = async function (productId) {
    const result = await this.aggregate([
        // get all reviews in a specific product
        { $match: { product: productId } },
        // Grouping Reviews Based on productId and cal average Ratings, Ratings Qunatity
        {
            $group: {
                _id: "product",
                avgRatings: { $avg: "$ratings" },
                ratingsQuantity: { $sum: 1 }
            }
        }
    ]);
    console.log(result[0]);
    if (result.length > 0) {
        const product = await Product.findByIdAndUpdate(
            productId,
            {
                ratingsAverage: result[0].avgRatings,
                ratingsQuantity: result[0].ratingsQuantity
            },
            { new: true }
        )
        // console.log(product);
        if (!product) return Promise.reject(new APIError("Can't Update Ratings In Product", 400));
    } else {
        const product = await Product.findByIdAndUpdate(
            productId,
            {
                ratingsAverage: 0,
                ratingsQuantity: 0
            },
            { new: true }
        )
        if (!product) return Promise.reject(new APIError("Can't Update Ratings In Product", 400));
    }
};

module.exports = Review;
