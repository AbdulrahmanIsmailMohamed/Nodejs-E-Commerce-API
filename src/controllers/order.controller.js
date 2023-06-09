const stripe = require("stripe")(process.env.STRIP_SECRET);

const Cart = require("../models/Cart");
const APIError = require("../util/APIError");
const asyncHandler = require("../middlewares/asyncHandler");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/user")

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

/**
* @access admin, manager
*/
const updateOrderStatusToPaid = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new APIError(`Not Found Order For This Id ${req.params.id}`, 404));
    order.isPaid = true;
    order.paidAt = Date.now();
    const orderPaid = await order.save();
    if (!orderPaid) return next(new APIError(`The Order Can't Be Updated!!`, 400));
    res.status(200).json({ success: true, orderPaid });
});

/**
* @access admin, manager
*/
const updateOrderStatusToDelivered = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new APIError(`Not Found Order For This Id ${req.params.id}`, 404));
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const orderDelivered = await order.save();
    if (!orderDelivered) return next(new APIError(`The Order Can't Be Updated!!`, 400));
    res.status(200).json({ success: true, orderDelivered });
});

/**
* @access user
*/
const createCheckoutSession = asyncHandler(async (req, res, next) => {
    console.log("hi");
    // app sitting by Admin
    let taxPrice = 0; let shippingPrice = 0;

    // get cart depend on cartId 
    const { cartId } = req.params
    const cart = await Cart.findById(cartId);
    if (!cart) return next(new APIError(`Not Found Cart For This Id ${cartId}`, 404));

    // get order price depend on cart price (check if coupon apply)
    const totalPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice;
    const totalOrderPrice = totalPrice + taxPrice + shippingPrice;

    // Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'egp',
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: req.user.name,
                    },
                },
                quantity: 1,
            }
        ],
        mode: "payment",
        success_url: `${req.protocol}://${req.get("host")}${process.env.API}/orders`,
        cancel_url: `${req.protocol}://${req.get("host")}${process.env.API}/carts`,
        customer_email: req.user.email,
        client_reference_id: req.params.cartId,
        metadata: req.body.shippingAddress,
    });
    res.status(200).json({ success: true, session })
});

/**
* @access user
*/
const createWebhookCheckout = asyncHandler(async (req, res, next) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.WEBHOOK_SECRET
        );
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // Handle the event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object
        const userEmail = session.customer_email;
        const cartId = session.client_reference_id;
        const totalOrderPrice = session.amount_total / 100;
        const user = await User.findOne({ email: userEmail });
        if (!user) return next(new APIError(`Not Found User For This Email ${userEmail}`, 404));
        const cart = await Cart.findById(cartId);
        if (!cart) return next(new APIError(`Not Found Cart For This Id ${cartId}`, 404));
        // create Order
        const order = await Order.create({
            userId: user._id,
            cartItems: cart.cartItems,
            totalOrderPrice,
            isPaid: true,
            paidAt: Date.now(),
            paymentMethodType: "card"
        });
        if (!order) return next(new APIError(`Can't Be created Order!`, 400));
        // after create order, decrement product quantity, increment product sold
        const bulkWriteOpt = cart.cartItems.map((item) => ({
            updateOne: {
                filter: { _id: item.productId },
                update: { $inc: { quantity: -item.quantity, sold: + item.quantity } }
            }
        }));
        await Product.bulkWrite(bulkWriteOpt, {});
        const deleteCart = await Cart.findByIdAndDelete(cartId);
        if (!deleteCart) return next(new APIError("Can't Be Found Cart!!", 404));
    } else {
        res.status(400).json({ success: false })
    }
    res.status(200).json({ recieved: true });
});

module.exports = {
    createOrder,
    createFilterObj,
    getAllOrders,
    getSpecificOrder,
    deleteOrder,
    updateOrderStatusToPaid,
    updateOrderStatusToDelivered,
    createCheckoutSession,
    createWebhookCheckout
}