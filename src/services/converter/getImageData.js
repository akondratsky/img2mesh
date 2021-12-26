import { state } from "../state";

/**
 * 
 * @param {HTMLImageElement} img
 * @return {ImageData}
 */
 export const getImageData = (img) => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);

  // originally this data.data is _pixels
  const imageData = context.getImageData(0, 0, img.width, img.height);

  state.updateImageData(imageData);

  return imageData;
}