const sizeOf = require('image-size');
const sharp = require('sharp');
const ImageInfo = require("./models/ImageInfo");
const fs = require('fs');
const path = require('path');

function processImages(imagesData) {
    // Create the 'resizedImages' folder if it doesn't exist
    const resizedImagesDir = path.join(__dirname, 'resizedImages');
    if (!fs.existsSync(resizedImagesDir)) {
        fs.mkdirSync(resizedImagesDir);
    }

    const promises = imagesData.map(imageInfo => {
        const imageData = imageInfo.imageData;
        const outputPath = path.join(resizedImagesDir, `resized_${imageInfo.fileName}`);

        return new Promise((resolve, reject) => {
            sharp(imageData)
                .resize(imageInfo.width, imageInfo.height)
                .toFile(outputPath, (err, info) => {
                    if (err) {
                        reject(err);
                    } else {
                        const resizedWidthPx = info.width;
                        const resizedHeightPx = info.height;
                        imageInfo.URL = outputPath;
                        resolve();
                    }
                });
        });
    });

    return Promise.all(promises).then(() => {
        return imagesData;
    });

}

module.exports = {
    processImages
};