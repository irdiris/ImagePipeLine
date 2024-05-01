const {  processImages } = require("./ImageResize");
const {importImage} = require('./ImageImport')
const {packImages} = require('./BinPacker')
importImage()
    .then(imagesData => {
        processImages(imagesData)
        packImages(imagesData)
    })
    .catch(error => {
        console.error(error);
    });