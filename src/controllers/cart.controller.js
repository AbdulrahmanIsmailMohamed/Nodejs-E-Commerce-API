const asyncHandler = require("../middlewares/asyncHandler");
const Cart = require("../models/Cart");
const Coupon = require("../models/Coupon");
const Product = require("../models/Product");
const APIError = require("../util/APIError");

const calculateTotalPriceBeforeDescount = (cart) => {
    let totalPrice = 0;
    cart.cartItems.forEach((item) => {
        totalPrice += item.price * item.quantity
    });
    cart.totalCartPrice = totalPrice;
    cart.totalPriceAfterDiscount = undefined;
    return totalPrice;
}

const addProductToCart = asyncHandler(async (req, res, next) => {
    // create cart for logged user with product
    const { productId, color } = req.body
    let cart = await Cart.findOne({ userId: req.user._id });
    const product = await Product.findById(productId);
    if (!cart) {
        cart = await Cart.create({
            cartItems: [{ productId, color, price: product.price }],
            userId: req.user._id
        });
        if (!cart) return next(new APIError("Can't Be Add Product To Cart!!", 400));
    } else {
        // product exist in cart, update product quantity
        let cartItemIndex = cart.cartItems
            .findIndex((item) => item.productId.toString() === productId && item.color === color);
        if (cartItemIndex > -1) {
            let cartItem = cart.cartItems[cartItemIndex]
            cartItem.quantity += 1;
            cart.cartItems[cartItemIndex] = cartItem
        } else {
            // product not exist in cart, push product to cartItems array
            cart.cartItems.push({ productId, color, price: product.price })
        }
    }
    calculateTotalPriceBeforeDescount(cart);
    await cart.save();
    res.status(201).json({ success: true, Carts: cart });
});

const getCarts = asyncHandler(async (req, res, next) => {
    const carts = await Cart.findOne({ userId: req.user._id });
    if (!carts) return next(new APIError(`No Carts For This Id ${req.user._id}!!`, 404));
    calculateTotalPriceBeforeDescount(carts);
    await carts.save()
    res.status(200).json({ success: true, numberOfCartItems: carts.cartItems.length, carts });
});

const getSpecificCartItem = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return next(new APIError(" Not Found Carts For This User!!", 404));
    const specifieCart = cart.cartItems.find(
        (item) => item._id.toString() === req.params.cartItemId
    );
    if (!specifieCart) return next(new APIError(`Not Found Cart For This Id ${req.params.cartItemId}!!`, 400));
    res.status(201).json({ success: true, specifieCart });
});

const deleteSpecificCartItem = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOneAndUpdate(
        { userId: req.user._id },
        {
            $pull: { cartItems: { _id: req.params.cartItemId } }
        },
        { new: true }
    );
    calculateTotalPriceBeforeDescount(cart);
    await cart.save()
    if (!cart) return next(new APIError("The Cart Can't Be Deleted!!", 400));
    res.status(204).json({ success: true });
});

const deleteCarts = asyncHandler(async (req, res, next) => {
    const carts = await Cart.findOneAndDelete({ userId: req.user._id });
    if (!carts) return next(new APIError("The Cart Can't Be Deleted!!", 400));
    res.status(204).json({ success: true });
});

const updateTheQuantityofcartItems = asyncHandler(async (req, res, next) => {
    const { quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return next(new APIError(" Not Found Carts For This User!!", 404));
    let specifieCart = cart.cartItems.find(
        (item) => item._id.toString() === req.params.cartItemId
    );
    if (!specifieCart) return next(new APIError(`Not Found CartItems For This Id ${req.params.cartItemId}!!`, 400));
    specifieCart.quantity = quantity;
    calculateTotalPriceBeforeDescount(cart)
    await cart.save()
    res.status(200).json({ success: true, specifieCart, cart });
});

const applyCoupon = asyncHandler(async (req, res, next) => {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return next(new APIError(`Can't Found Cart For This Id ${req.user._id}`, 404));
    let coupon = await Coupon.findOne(
        {
            name: req.body.coupon,
            expire: { $gt: Date.now() }
        }
    );
    if (!coupon) return next(new APIError("Coupon Name Not Valid Or Expire", 400));
    const totalPrice = calculateTotalPriceBeforeDescount(cart);
    const totalPriceAfterDiscount = (totalPrice - ((coupon.discount * totalPrice) / 100));
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
    await cart.save();
    res.status(200).json({ success: true, numberOfCartItems: cart.cartItems.length, cart });
});

module.exports = {
    addProductToCart,
    getCarts,
    getSpecificCartItem,
    deleteSpecificCartItem,
    deleteCarts,
    updateTheQuantityofcartItems,
    applyCoupon
}