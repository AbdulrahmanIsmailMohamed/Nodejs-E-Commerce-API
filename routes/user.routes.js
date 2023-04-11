const router = require("express").Router();

const {
    createUser,
    deleteUser,
    updateUser,
    getUsers,
    uploadUserImage,
    resizeImage,
    getUser,
    changePassword
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

router.patch("/change-password/:id", changePasswordValidator, changePassword);

router
    .route("/")
    .get(
        protectRoute,
        allowTo("admin", "manager"),
        getUsers
    )
    .post(
        protectRoute,
        allowTo("admin", "manager"),
        uploadUserImage,
        resizeImage,
        createUserValidator,
        createUser
    );

router
    .route("/:id")
    .get(
        protectRoute,
        allowTo("admin", "manager"),
        userIdValidator,
        getUser
    )
    .delete(
        protectRoute,
        allowTo("admin", "manager"),
        userIdValidator,
        deleteUser
    )
    .patch(
        protectRoute,
        allowTo("admin", "manager"),
        uploadUserImage,
        resizeImage,
        updateUserValidator,
        updateUser
    );

module.exports = router;