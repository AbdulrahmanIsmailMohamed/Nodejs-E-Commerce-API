const router = require("express").Router();

const {
    createOrder,
    getAllOrders,
    getSpecificOrder,
    deleteOrder,
    createFilterObj
} = require("../controllers/order.controller");
const { protectRoute, allowTo } = require("../config/auth");
const { createOrderValidator, orderIdValidator } = require("../util/validator/orderValidator");

router.use(protectRoute)

router.post(
    "/:cartId",
    allowTo("user"),
    createOrderValidator,
    createOrder
);

router.get(
    "/",
    allowTo("user", "admin"),
    createFilterObj,
    getAllOrders
)

router
    .route("/:id")
    .get(
        allowTo("user", "admin"),
        orderIdValidator,
        getSpecificOrder
    )
    .delete(
        allowTo("user"),
        orderIdValidator,
        deleteOrder
    )

module.exports = router;