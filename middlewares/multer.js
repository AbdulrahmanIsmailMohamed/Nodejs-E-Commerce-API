const multer = require('multer');
const APIError = require("../util/APIError");

/**
* * Disk Storage
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/categories");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `category--${uuidv4()}--${Date.now()}.${file.mimetype.split("/")[1]}`;
        cb(null, uniqueSuffix);
    }
});
*/
// memory storage
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) cb(null, true);
    else cb(new APIError("Add Only image", 400), null);
}

const upload = multer({ fileFilter: multerFilter, storage: multerStorage });

const multerMW = (fieldName = "image") =>
    upload.single(fieldName);

module.exports = {
    multerMW,
};