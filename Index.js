const fs = require('fs');
const sizeOf = require('image-size');
const sharp = require('sharp');
var pack = require('bin-pack');

const images = [
  { name: 'pic1', src: 'TestImages/pic1.jpg' },
  { name: 'pic2', src: 'TestImages/pic2.jpg' },
  { name: 'pic3', src: 'TestImages/pic3.jpg' }
];

const ppc = 38;

function cmToPixels(cmWidth, cmHeight) {
  const pixelWidth = Math.round(cmWidth * ppc);
  const pixelHeight = Math.round(cmHeight * ppc);
  return { width: pixelWidth, height: pixelHeight };
}

const bins = []; // Initialize empty bins array

for (const imageObj of images) {
  fs.readFile(imageObj.src, (err, data) => {
    if (err) throw err;
    const dimensions = sizeOf(data);
    const imgWidthPixels = dimensions.width;
    const imgHeightPixels = dimensions.height;
    const imgWidthCm = imgWidthPixels / ppc;
    const imgHeightCm = imgHeightPixels / ppc;

    console.log(`Image ${imageObj.name} dimensions: ${imgWidthCm.toFixed(2)} cm x ${imgHeightCm.toFixed(2)} cm`);

    const { width, height } = cmToPixels(imgWidthCm, imgHeightCm);

    sharp(data)
      .resize(width, height)
      .toFile(`resized_${imageObj.name}.jpg`, (err, info) => {
        if (err) throw err;
        // Convert resized dimensions from centimeters to pixels
        const resizedWidthPx = info.width;
        const resizedHeightPx = info.height;

       console.log(`Resized image: ${resizedWidthPx} px x ${resizedHeightPx} px`);

        // Add resized dimensions in pixels to bins array
        bins.push({ width: resizedWidthPx, height: resizedHeightPx });
      });
  });
}

var result = pack(bins);
