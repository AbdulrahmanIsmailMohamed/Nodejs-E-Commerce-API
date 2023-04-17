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
    getLoggedUserId,
    inactiveLoggedUser,
    changeLoggedUserPassword
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

router.use(protectRoute);

router.patch("/change-password/:id", changePasswordValidator, changePassword);

router.get("/getMe", getLoggedUserId, getUser);

router.patch("/changeMyPassword", changeLoggedUserPassword);

router.delete("/inactiveMyAccount", inactiveLoggedUser);

/**
 * @access private (Admin)
*/
router.use(allowTo("admin", "manager"));

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