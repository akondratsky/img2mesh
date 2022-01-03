import { state, OPTIONS, IMAGE_DATA } from 'src/services/state';
/**
 * @description converts vertex coordinates to image coordinates
 * @param {number} vx 
 * @param {number} vy 
 */
export const vertex2imageCoords = (vx, vy) => {
  const { pixelFactor } = state.get(OPTIONS);
  const { height } = state.get(IMAGE_DATA);

  /*
    Во-первых, меш по отношению к изображению - транспонированная матрица, судя по всему
    Во-вторых, ось y развернута
  */
  const iy = Math.floor(height - vy * pixelFactor - 1);
  const ix = Math.floor(vx * pixelFactor);

  return [ix, iy];
};
