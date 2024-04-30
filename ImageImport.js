const fs = require('fs');
const path = require('path');
const ImageInfo = require("./Models/ImageInfo");
const folderPath = 'TestImages';
function importImage() {
  return new Promise((resolve, reject) => {
    const imagesData = [];
    let length = 0;
    let width = 0;

    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject('Error reading folder:', err);
        return;
      }

      const imageFiles = files.filter(file => {
        const extension = path.extname(file).toLowerCase();
        return ['.jpg', '.png', '.gif', '.bmp'].includes(extension);
      });

      imageFiles.forEach(imageFile => {
        const imagePath = path.join(folderPath, imageFile);
        const imageData = fs.readFileSync(imagePath);

        // Extract length and width from the file name using regular expressions
        const fileNamePattern = /-(\d+)X(\d+)/;
        const match = imageFile.match(fileNamePattern);


        if (match) {
          length = parseInt(match[1], 10);
          width = parseInt(match[2], 10);

        }

        const imageInfo = new ImageInfo(imageFile, imageData, length, width);
        imagesData.push(imageInfo);
      });

      resolve(imagesData);
    });
  });
}
module.exports = {
  importImage
};