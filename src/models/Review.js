const { Schema, model } = require("mongoose");

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
            refs: "Product",
            required: [true, "The Product Id Is Required"]
        }
    },
    { timestamp: true }
);

reviewSchema.pre(/^find/, function (next) {
    console.log("His");
    this.populate("userId", "name")
    next();
});

const Review = model("Review", reviewSchema);

module.exports = Review;