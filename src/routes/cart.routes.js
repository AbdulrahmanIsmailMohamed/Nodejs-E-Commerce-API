const router = require("express").Router();
const { protectRoute, allowTo } = require("../config/auth");
const {
    addProductToCart,
    getCarts,
    getCart,
    deleteCart
} = require("../controllers/cart.controller")

router.use(protectRoute, allowTo("user"));

router
    .route("/")
    .post(addProductToCart)
    .get(getCarts)

router
    .route("/:cartId")
    // .patch(addProductToCart)
    .get(getCart)
    .delete(deleteCart)

module.exports = router;