const pack = require('bin-pack');
const Result = require("./models/Result");

function packImages(imagesData) {

    const bins = imagesData.map(imageInfo => ({
        width: imageInfo.width,
        height: imageInfo.height,
        URL: imageInfo.URL // Correcting the property name to URL
    }));

    const result = pack(bins);

    const imageInfos = result.items.map(item => {
        imagesData.forEach(imageInfo => {
            if (item.width === imageInfo.width && item.height === imageInfo.height) {
                item.item.URL = imageInfo.URL; // Assigning URL from imageData to the corresponding item
            }
        });
        const imageInfo = item.item;
        imageInfo.position_X = item.x;
        imageInfo.position_Y = item.y;

        return imageInfo;
    });

    let packResult = new Result(imageInfos, result.width, result.height);
    return packResult;
}

module.exports = {
    packImages
};
