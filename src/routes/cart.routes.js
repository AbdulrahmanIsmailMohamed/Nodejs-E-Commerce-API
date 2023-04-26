const router = require("express").Router();

const { protectRoute, allowTo } = require("../config/auth");
const {
    addProductToCart,
    getCarts,
    getSpecificCartItem,
    deleteSpecificCartItem,
    deleteCarts,
    updateTheQuantityofcartItems,
    applyCoupon
} = require("../controllers/cart.controller");
const {
    addProductToCartValidator,
    cartItemIdValidator,
    updateTheQuantityofcartItemsValidator,
    applyCouponValidator
} = require("../util/validator/cartValidator");

router.use(protectRoute, allowTo("user"));

router
    .route("/")
    .post(addProductToCartValidator, addProductToCart)
    .get(getCarts)
    .delete(deleteCarts)

router.patch('/applyCoupon',applyCouponValidator, applyCoupon);

router
    .route("/:cartItemId")
    .get(cartItemIdValidator, getSpecificCartItem)
    .patch(updateTheQuantityofcartItemsValidator, updateTheQuantityofcartItems)
    .delete(cartItemIdValidator, deleteSpecificCartItem)

module.exports = router;