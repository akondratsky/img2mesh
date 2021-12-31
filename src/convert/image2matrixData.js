import { Color } from 'three';

/**
 * @typedef ImageMatrixData
 * @prop {number[][]} rgbPixelMatrix
 * @prop {number} height
 * @prop {number} width
 */

/**
 * @param {HTMLImageElement} img
 * @return {ImageMatrixData}
 */
 export const image2matrixData = (img) => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);

  const { data, height, width } = context.getImageData(0, 0, img.width, img.height);

  const rgbPixelMatrix = [];

  for (let x = 0; x < width; x++) {
    rgbPixelMatrix.push([]);
    for (let y = 0; y < height; y++) {
      const base = (x * y + x) * 4;
      rgbPixelMatrix[x].push(new Color(
        data[base + 0] / 255,
        data[base + 1] / 255,
        data[base + 2] / 255,
      ));
    }
  }

  return {
    rgbPixelMatrix,
    height,
    width
  };
}