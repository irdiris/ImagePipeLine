const fs = require('fs');
const path = require('path');
const ImageInfo = require("./Models/ImageInfo");
const folderPath = 'TestImages';

function cmToPixels(width, height) {
  const ppi = 96;
  const cmToInch = 2.54;

  const widthInPixels = Math.round(width * ppi / cmToInch);
  const heightInPixels = Math.round(height * ppi / cmToInch);

  return { width: widthInPixels, height: heightInPixels };
}

function importImage() {
  return new Promise((resolve, reject) => {
    const imagesData = [];

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
        let height, width;

        if (match) {
          const { width: pixelWidth, height: pixelHeight } = cmToPixels(parseInt(match[1], 10), parseInt(match[2], 10));
          height = pixelHeight;
          width = pixelWidth;
        }

        const imageInfo = new ImageInfo(imageFile, imageData, height, width,0,0);
        imagesData.push(imageInfo);
      });
      resolve(imagesData);
    });
  });
}

module.exports = {
  importImage
};