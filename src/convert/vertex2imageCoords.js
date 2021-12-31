import { state, OPTIONS } from 'src/services/state';
/**
 * @description converts vertex coordinates to image coordinates
 * @param {number} vx 
 * @param {number} vy 
 */
export const vertex2imageCoords = (vx, vy) => {
   /** @type { number } */
  const pf = state.get(OPTIONS).pixelFactor;

  const ix = Math.floor(vx * pf);
  const iy = Math.floor(vy * pf);

  return [ix, iy];
};
