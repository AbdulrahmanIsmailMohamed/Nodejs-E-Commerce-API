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

router.patch("/change-password/:id", changePasswordValidator, changePassword);

router
    .route("/")
    .get(getUsers)
    .post(
        uploadUserImage,
        resizeImage,
        createUserValidator,
        createUser
    );

router
    .route("/:id")
    .get(userIdValidator, getUser)
    .delete(userIdValidator, deleteUser)
    .patch(
        uploadUserImage,
        resizeImage,
        updateUserValidator,
        updateUser
    );

module.exports = router;