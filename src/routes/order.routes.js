const router = require("express").Router();

const {
    createOrder,
    getAllOrders,
    getSpecificOrder,
    deleteOrder,
    createFilterObj,
    updateOrderStatusToDelivered,
    updateOrderStatusToPaid,
    createCheckoutSession
} = require("../controllers/order.controller");
const { protectRoute, allowTo } = require("../config/auth");
const { createOrderValidator, orderIdValidator } = require("../util/validator/orderValidator");

router.use(protectRoute)


router.get(
    "/",
    allowTo("user", "admin", "manager"),
    createFilterObj,
    getAllOrders
);

router.post(
    "/:cartId",
    allowTo("user"),
    createOrderValidator,
    createOrder
);

router
    .route("/:id")
    .get(
        allowTo("user", "admin", "manager"),
        orderIdValidator,
        getSpecificOrder
    )
    .delete(
        allowTo("user"),
        orderIdValidator,
        deleteOrder
    );

router.patch("/:id/pay", allowTo("admin", "manager"), updateOrderStatusToPaid);

router.patch("/:id/deliver", allowTo("admin", "manager"), updateOrderStatusToDelivered);

router.get("/checkout-sessions/:cartId", allowTo("user"), createCheckoutSession);

module.exports = router;