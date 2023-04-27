const { Schema, model } = require("mongoose");

const orderSchema = Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "The User Id Must Be Not Null"]
        },
        cartItems: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: [true, "The Product Id Must Be Not Null"]
                },
                quantity: Number,
                color: String,
                price: Number,
            },
        ],
        taxPrice: {
            type: Number,
            default: 0,
        },
        shippingAddress: {
            details: String,
            phone: String,
            city: String,
            postalCode: String,
        },
        shippingPrice: {
            type: Number,
            default: 0,
        },
        totalOrderPrice: {
            type: Number,
        },
        paymentMethodType: {
            type: String,
            enum: ['card', 'cash'],
            default: 'cash',
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paidAt: Date,
        isDelivered: {
            type: Boolean,
            default: false,
        },
        deliveredAt: Date,
    },
    { timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports = Order;