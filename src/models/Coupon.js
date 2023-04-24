const { Schema, model } = require("mongoose");


const couponSchema = Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "The Name Is Required"],
            uppercase: [true, "The Name Must Be Uppercase"],
            unique: [true, "The Name Must Be Unique"]
        },
        expire: {
            type: Date,
            required: [true, "The Expire Is Required"]
        },
        discount: {
            type: Number,
            required: [true, "The Discount Is Required"]
        },

    },
    { timestamps: true }
);

const Coupon = model("Coupon", couponSchema);

module.exports = Coupon;