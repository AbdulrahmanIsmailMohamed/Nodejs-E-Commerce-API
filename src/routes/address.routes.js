const router = require("express").Router();

const { protectRoute, allowTo } = require("../config/auth");
const {
    getLoggedUserAdresses,
    deleteAddress,
    createAddress,
} = require("../controllers/address.controller");
const {
    addressIdValidator,
    createAddressValidator
} = require("../util/validator/addressValidator");

router.use(protectRoute, allowTo('user'));

router
    .route("/")
    .post(createAddressValidator, createAddress)
    .get(getLoggedUserAdresses);

router
    .route("/:addressId")
    .delete(addressIdValidator, deleteAddress)

module.exports = router;