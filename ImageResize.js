
const sizeOf = require('image-size');
const sharp = require('sharp');
const ImageInfo = require("./Models/ImageInfo");
function cmToPixels(width, height) {
    const ppi = 96;
    const cmToInch = 2.54;

    const widthInPixels = Math.round(width * ppi / cmToInch);
    const heightInPixels = Math.round(height * ppi / cmToInch);

    return { width: widthInPixels, height: heightInPixels };
}

function processImages(imagesData) {
    imagesData.forEach(imageInfo => {
        const imageData = imageInfo.imageData;
        const { width, height } = cmToPixels(imageInfo.width, imageInfo.length);

        sharp(imageData)
            .resize(width, height)
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