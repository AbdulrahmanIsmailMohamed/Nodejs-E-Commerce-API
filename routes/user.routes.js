const router = require("express").Router();
const {
    createUser,
    deleteUser,
    updateUser,
    getUsers,
    uploadUserImage,
    resizeImage,
    getUser
} = require("../controllers/user.controller");

const {
    createUserValidator,
    updateUserValidator,
    userIdValidator
} = require("../util/validator/userValidator")

router
    .route("/")
    .get(getUsers)
    .post(
        createUserValidator,
        uploadUserImage,
        resizeImage,
        createUser
    );

router
    .route("/:id")
    .get(userIdValidator, getUser)
    .delete(userIdValidator, deleteUser)
    .patch(
        updateUserValidator,
        uploadUserImage,
        resizeImage,
        updateUser
    );

module.exports = router;