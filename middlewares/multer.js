const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/categories");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `category--${uuidv4()}--${Date.now()}.${file.mimetype.split("/")[1]}`;
        cb(null, uniqueSuffix);
    }
})


const upload = multer({ storage: multerStorage });

const multerMW = upload.single("image");

module.exports = multerMW;