import { state } from '../state';

/**
 * 
 * @param {File} file 
 * @return {HTMLImageElement}
 */
 export const readImage = (file) => {
  if (!file.type.match(/image\/\w+/)) {
    alert('Only image file type supported');
    return;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result;
      image.onload = () => {
        state.updateImage(image);
        resolve(image);
      }
    };
    reader.readAsDataURL(file);
  })
}