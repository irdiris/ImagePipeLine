const mergeImages = require('merge-images');
const fs = require('fs');
const { Canvas, Image } = require('canvas');

const ImageInfo = require("./models/ImageInfo");
const Source = require("./models/Sources");

async function mergeImagesFromResult(result, outputFilePath = 'output') {
   return new Promise(async (resolve, reject) => {
      try {
         const sources = result.imageInfos.map(imageInfo => {
            console.log(imageInfo); // Log the imageInfo object for debugging
            // Ensure that imageInfo.path is properly accessed and passed to the Source constructor
            return new Source(imageInfo.path, imageInfo.position_X, imageInfo.position_Y);
         });
         console.log('Sources:', sources);

         try {
            const base64 = await mergeImages(sources, {
               width: result.width,
               height: result.height,
               Canvas: Canvas,
               Image: Image
            });
            console.log('Merge successful, base64:', base64);

            const buffer = Buffer.from(base64.split(',')[1], 'base64');
            fs.writeFileSync(outputFilePath, buffer);

            console.log('Images merged successfully!');
            resolve(); // Resolve the Promise when the operation is successful
         } catch (error) {
            console.error('Error in mergeImages:', error);
            reject(error);
         }
      } catch (error) {
         console.error('Error merging images:', error);
         reject(error); // Reject the Promise with the error
      }
   });
}

module.exports = {
   mergeImagesFromResult
};