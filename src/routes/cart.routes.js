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
} = require("../controllers/cart.controller")

router.use(protectRoute, allowTo("user"));

router
    .route("/")
    .post(addProductToCart)
    .get(getCarts)
    .delete(deleteCarts)

router.patch('/applyCoupon', applyCoupon);

router
    .route("/:cartItemId")
    .get(getSpecificCartItem)
    .patch(updateTheQuantityofcartItems)
    .delete(deleteSpecificCartItem)

module.exports = router;