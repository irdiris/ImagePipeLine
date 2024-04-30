const {  processImages } = require("./ImageResize");
const {importImage} = require('./ImageImport')
importImage()
    .then(imagesData => {
        processImages(imagesData);
    })
    .catch(error => {
        console.error(error);
    });