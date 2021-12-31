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
 export const image2imageData = (img) => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);

  return context.getImageData(0, 0, img.width, img.height);

  // const rgbPixelMatrix = [];

  // for (let y = 0; y < height; y++) {
  //   rgbPixelMatrix.push([]);
  
  //   for (let x = 0; x < height; x++) {
  //     const base = (y * width + x) * 4;
  
  //     rgbPixelMatrix[y].push(new Color(
  //       data[base + 0] / 255,
  //       data[base + 1] / 255,
  //       data[base + 2] / 255,
  //     ));
  //   }
  // }
};

