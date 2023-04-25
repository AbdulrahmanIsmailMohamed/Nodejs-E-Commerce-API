const { Schema, model, default: mongoose } = require("mongoose");

const cartSchema =mongoose.Schema(
    {
        cartItems: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: [true, "The Product Is Required!"]
            },
            quantity: {
                type: Number,
                default: 1
            },
            color: String,
            price: Number
        }],
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "The User Is Required!"]
        },
        totalCartPrice: Number,
        totalPriceAfterDiscount: Number,
    },
    { timestamps: true }
);

const Cart = model("Cart", cartSchema)

module.exports = Cart;