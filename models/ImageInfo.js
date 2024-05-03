class ImageInfo {
    constructor(fileName, imageData, height, width, position_X, position_Y, path) {
        this.fileName = fileName;
        this.imageData = imageData;
        this.height = height;
        this.width = width;
        this.position_X = position_X;
        this.position_Y = position_Y;
        this.path = path;
    }
}
module.exports = ImageInfo;