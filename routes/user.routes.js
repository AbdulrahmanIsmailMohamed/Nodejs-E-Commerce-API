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

router
    .route("/")
    .get(getUsers)
    .post(
        uploadUserImage,
        resizeImage,
        createUser
    );

router
    .route("/:id")
    .get(getUser)
    .delete(deleteUser)
    .patch(
        uploadUserImage,
        resizeImage,
        updateUser
    );

module.exports = router;