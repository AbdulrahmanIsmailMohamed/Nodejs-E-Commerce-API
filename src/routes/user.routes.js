const router = require("express").Router();

const {
    createUser,
    deleteUser,
    updateUser,
    getUsers,
    uploadUserImage,
    resizeImage,
    getUser,
    changePassword,
    getLoggedUserId
} = require("../controllers/user.controller");

const {
    createUserValidator,
    updateUserValidator,
    userIdValidator,
    changePasswordValidator
} = require("../util/validator/userValidator")

const {
    protectRoute,
    allowTo
} = require("../config/auth");

router.patch("/change-password/:id", protectRoute, changePasswordValidator, changePassword);

router.get("/getMe", protectRoute, getLoggedUserId, getUser);

/**
 * @access private (Admin)
*/
router.use(protectRoute, allowTo("admin", "manager"));

router
    .route("/")
    .get(getUsers)
    .post(uploadUserImage, resizeImage, createUserValidator, createUser);

router
    .route("/:id")
    .get(userIdValidator, getUser)
    .delete(userIdValidator, deleteUser)
    .patch(uploadUserImage, resizeImage, updateUserValidator, updateUser);

module.exports = router;