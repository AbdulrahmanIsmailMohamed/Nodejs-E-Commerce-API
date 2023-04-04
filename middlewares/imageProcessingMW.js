const sharp = require("sharp");
const { v4: uuidv4 } = require('uuid')
const asyncHandler = require("./asyncHandler");

const imageProcessing = (
    imageNameFolder,
    nameFolder,
    format = "jpeg",
    quality = 90,
    hight = 600,
    width = 600
) =>
    asyncHandler(async (req, res, next) => {
        const uniqueSuffix = `${imageNameFolder}--${uuidv4()}--${Date.now()}.${format}`;

        if (req.file) {
            await sharp(req.file.buffer)
                .resize(width, hight)
                .toFormat(`${format}`, { quality: quality })
                // .jpeg({ quality: 90 })
                .toFile(`uploads/${nameFolder}/${uniqueSuffix}`);
        }

        // save image into our db
        //* url: http://localhost:3333/api/v1/categories/category--036615f5-c390-48fb-99ce-2d03330bb47f--1680570794277.jpeg
        
        const api = process.env.API
        const basePath = `${req.protocol}://${req.get('host')}${api}/${nameFolder}/${uniqueSuffix}`;
        req.body.image = basePath;
        
        next();
    });


module.exports = imageProcessing;