import { state, OPTIONS } from 'src/services/state';

/**
 * @description return pixel brightness between 0 and 1 based on human perceptual bias
 * @param {THREE.Color} c - color
 * @returns {number} 
 */
export const color2Brightness = ({ r, g, b }) => {
  const { isAbsolute, isInvert } = state.get(OPTIONS);
  
  const brightness = isAbsolute ?
    (r + g + b) / 3.0
    : (0.34 * r + 0.5 * g + 0.16 * b);

  return isInvert ?
    1.0 - brightness
    : brightness;
}
