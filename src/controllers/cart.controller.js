const asyncHandler = require("../middlewares/asyncHandler");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const APIError = require("../util/APIError");

const calculateTotalPriceBeforeDescount = (cart) => {
    let totalPrice = 0;
    cart.cartItems.forEach((item) => {
        totalPrice += item.price * item.quantity
    });
    cart.totalCartPrice = totalPrice;
}

const addProductToCart = asyncHandler(async (req, res, next) => {
    // create cart for logged user with product
    const { productId, color } = req.body
    let cart = await Cart.findOne({ userId: req.user._id });
    const product = await Product.findById(productId);
    if (!cart) {
        const newCart = await Cart.create({
            cartItems: [{ productId, color, price: product.price }],
            userId: req.user._id
        });
        if (!newCart) return next(new APIError("Can't Be Add Product To Cart!!", 400));
    } else {
        // product exist in cart, update product quantity
        console.log("there Is Cart");
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
    cart.save();
    res.status(201).json({ success: true, Carts: cart });
});

const getCarts = asyncHandler(async (req, res, next) => {
    const carts = await Cart.find({ userId: req.user._id });
    if (!carts) return next(new APIError("Carts Not Found!!", 404));
    res.status(200).json({ success: true, carts });
});

const getCart = asyncHandler(async (req, res, next) => {
    const cart = await Cart.find({ userId: req.user._id });
    if (!cart) return next(new APIError(" Not Found Carts For This User!!", 404));
    const specifieCart = cart.cartItems.find(
        (item) => item._id.toString() === req.params.cartId
    );
    if (!specifieCart) return next(new APIError(`Not Found Cart For This Id ${req.params.cartId}!!`, 400));
    res.status(201).json({ success: true, specifieCart });
});

const deleteCart= asyncHandler(async (req, res, next) => {
    const cart = await Cart.findByIdAndUpdate(
        req.user._id,
        {
            $pull: { cartItems: { _id: req.params.cartId } }
        },
        { new: true }
    );
    if (!cart) return next(new APIError("The Cart Can't Be Deleted!!", 400));
    res.status(204).json({ success: true });
});

module.exports = {
    addProductToCart,
    getCarts,
    getCart,
    deleteCart
}