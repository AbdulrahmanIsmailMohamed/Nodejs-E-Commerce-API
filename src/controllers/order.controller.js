const Cart = require("../models/Cart");
const APIError = require("../util/APIError");
const asyncHandler = require("../middlewares/asyncHandler");
const Order = require("../models/Order");
const Product = require("../models/Product");

const {
    getAll,
    getOne,
    deleteOne
} = require("./handlerFactory");

/**
* @access user
*/
const createOrder = asyncHandler(async (req, res, next) => {
    // app sitting by Admin
    let taxPrice = 0; let shippingPrice = 0;

    // get cart depend on cartId 
    const { cartId } = req.params
    const cart = await Cart.findById(cartId);
    if (!cart) return next(new APIError(`Not Found Cart For This Id ${cartId}`, 404));

    // get order price depend on cart price (check if coupon apply)
    const totalPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice;
    const totalOrderPrice = totalPrice + taxPrice + shippingPrice;
    // create order with default paymentMethodType cash
    const order = await Order.create({
        userId: req.user._id,
        cartItems: cart.cartItems,
        shippingAddress: req.body.shippingAddress,
        totalOrderPrice
    });
    if (!order) return next(new APIError("The Order Can't Be Created!!", 400));

    // after creating order, decrement product quantity, increment product sold
    /*cart.cartItems.forEach(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) return next(new APIError("Not Found Product", 404));
        product.quantity -= item.quantity;
        product.sold += item.quantity
        await product.save();
    });*/

    const bulkWriteOpt = cart.cartItems.map((item) => ({
        updateOne: {
            filter: { _id: item.productId },
            update: { $inc: { quantity: -item.quantity, sold: +item.quantity } }
        }
    }));

    await Product.bulkWrite(bulkWriteOpt, {})

    // clear cart depend on cart id
    const deleteCart = await Cart.findByIdAndDelete(cartId);
    if (!deleteCart) return next(new APIError("Can't Be Found Cart!!", 404));

    res.status(200).json({ success: true, order });
});

const createFilterObj = (req, res, next) => {
    if (req.user.role === "user") req.filterObj = { userId: req.user._id };
    next();
}

/**
* @access admin, user 
*/
const getAllOrders = getAll(Order);

/**
* @access admin, user 
*/
const getSpecificOrder = getOne(Order);


/**
* @access  user 
*/
const deleteOrder = deleteOne(Order);

module.exports = {
    createOrder,
    createFilterObj,
    getAllOrders,
    getSpecificOrder,
    deleteOrder
}