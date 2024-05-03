const pack = require('bin-pack');
const Result = require("./models/Result");
function packImages(imagesData) {
    const bins = imagesData.map(imageInfo => ({
        width: imageInfo.width,
        height: imageInfo.height,
        image: imageInfo.imageData,
        item: imageInfo
    }));

    const result = pack(bins);

    const imageInfos = result.items.map(item => {
        const imageInfo = item.item;
        imageInfo.position_X = item.x;
        imageInfo.position_Y = item.y;
        return imageInfo;
    });
    let packResult = new Result(imageInfos, result.width, result.height);
    console.log(packResult);
    return packResult;
}

module.exports = {
    packImages
};