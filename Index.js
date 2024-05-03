const { processImages } = require("./ImageResize");
const { importImage } = require('./ImageImport');
const { packImages } = require("./BinPacker");
const { mergeImagesFromResult } = require("./ImageMerge");

importImage()
    .then(imagesData => {
        return processImages(imagesData);
    })
    .then(imagesData => {
        const result = packImages(imagesData);
        return mergeImagesFromResult(result);

    })
    .then(r => {
        console.log("done");
    })
    .catch(error => {
        console.error(error);
    });