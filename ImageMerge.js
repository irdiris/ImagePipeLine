const mergeImages = require('merge-images');
const fs = require('fs');
const { Canvas, Image } = require('canvas');

const ImageInfo = require("./models/ImageInfo");
const Source = require("./models/Sources");
const path = require("path");

async function mergeImagesFromResult(result, outputFilePath = 'output') {
   return new Promise(async (resolve, reject) => {
      try {
         const sources = result.imageInfos.map(imageInfo => {
            return new Source(imageInfo.URL, imageInfo.position_X, imageInfo.position_Y);
         });
          console.log('Result:', result); // Log sources before mergeImages

          console.log('Sources:', sources); // Log sources before mergeImages

         try {
             mergeImages(sources,{
                     width: 4914,
                     height: 3780,
                     Canvas: Canvas,
                     Image: Image
                 }
             )
                 .then(mergedImageData => {
                     console.log('mergedImageData:', mergedImageData); // Log the merged image data

                     const buffer = Buffer.from(mergedImageData.split(',')[1], 'base64');
                     const outputFilePath = path.join(__dirname, "output", "merged_image.png"); // Construct the output file path
                     fs.writeFileSync(outputFilePath, buffer);
                     console.log('Images merged successfully!');
                 })
                 .catch(error => {
                     console.error('Error:', error);
                 });
         } catch (error) {
            console.error('Error in mergeImages:', error);
            reject(error);
         }
      } catch (error) {
         console.error('Error generating sources:', error);
         reject(error); // Reject the Promise with the error
      }
   });
}

module.exports = {
   mergeImagesFromResult
};