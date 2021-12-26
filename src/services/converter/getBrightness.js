import { optionsService } from "../options";

/**
 * @description return pixel brightness between 0 and 1 based on human perceptual bias
 * @param {THREE.Color} c - color
 * @returns {number} 
 */
export const getBrightness = (c) => {
  const { isAbsolute, isInvert } = optionsService.options;
  
  const brightness = isAbsolute ?
    (c.r + c.g + c.b) / 3.0
    : (0.34 * c.r + 0.5 * c.g + 0.16 * c.b);

  return isInvert ?
    1.0 - brightness
    : brightness;
}
