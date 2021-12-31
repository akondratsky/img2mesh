/**
 * 
 * @param {File} file 
 * @return {Promise<HTMLImageElement>}
 */
 export const file2image = (file) => {
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
        resolve(image);
      }
    };
    reader.readAsDataURL(file);
  })
}