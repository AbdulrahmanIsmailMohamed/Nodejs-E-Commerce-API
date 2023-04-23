const router = require("express").Router();

const { protectRoute, allowTo } = require("../config/auth");
const {
    addProductToWishlist,
    removeProductFromWishlist,
    getLoggedUserWishlist
} = require("../controllers/wishlist.controller");
const { productIdValidator } = require("../util/validator/wishlistValidator");

router.use(protectRoute, allowTo("user"))

router
    .route("/")
    .post(productIdValidator, addProductToWishlist)
    .get(getLoggedUserWishlist)

router.delete("/:productId", removeProductFromWishlist)

module.exports = router;