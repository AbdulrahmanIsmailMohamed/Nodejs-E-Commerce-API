const router = require("express").Router();

const { createOrder } = require("../controllers/order.controller");
const { protectRoute, allowTo } = require("../config/auth");

router.post("/:cartId", protectRoute, allowTo("user"), createOrder)

module.exports = router;