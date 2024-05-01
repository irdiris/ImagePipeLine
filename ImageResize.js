
const sizeOf = require('image-size');
const sharp = require('sharp');
const ImageInfo = require("./Models/ImageInfo");


function processImages(imagesData) {
    imagesData.forEach(imageInfo => {
        const imageData = imageInfo.imageData;
        sharp(imageData)
            .resize(imageInfo.width, imageInfo.height)
            .toFile(`resized_${imageInfo.fileName}`, (err, info) => {
                if (err) throw err;
                const resizedWidthPx = info.width;
                const resizedHeightPx = info.height;

                console.log(`Resized image: ${resizedWidthPx} px x ${resizedHeightPx} px`);
            });
    });
}

module.exports = {
    processImages
};