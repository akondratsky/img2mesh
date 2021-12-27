let _image = null;
let _imageData = null;

class State {
  updateImage(img) {
    _image = img;
  }
  /** @returns {Image} */
  getImage() {
    return _image;
  }

  updateImageData(imageData) {
    _imageData = imageData;
  }
  /** @returns {ImageData} */
  getImageData() {
    return _imageData;
  }

  isImageReady() {
    return !!_image && !!_imageData;
  }
}

export const state = new State();
