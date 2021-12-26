import * as THREE from 'three';
import { optionsService } from '../options';
import { state } from '../state';

/**
 * @param {number} x - left to right X 
 * @param {number} y - top to bottom Y 
 * @returns {THREE.Color}
 */
export const getColor = (x, y) => {
  const { data, width, height } = state.getImageData();
  const { isSmooth } = optionsService.options;

  const floor = Math.floor;
  const base = (floor(y) * width + floor(x)) * 4;

  const c = {
    r: data[base + 0],
    g: data[base + 1],
    b: data[base + 2]
  };

  if (isSmooth
    && x > 0
    && y > 0
    && x < width - 1
    && y < height - 1) {
      const left = ((floor(y) * width + floor(x - 1)) * 4);
      const leftup = ((floor(y - 1) * width + floor(x - 1)) * 4);
    	const leftdown = ((floor(y + 1) * width + floor(x - 1)) * 4);
    	const right = ((floor(y) * width + floor(x + 1)) * 4);
    	const rightup = ((floor(y - 1) * width + floor(x + 1)) * 4);
    	const rightdown = ((floor(y + 1) * width + Math.floor(x + 1)) * 4);
    	const up = ((floor(y - 1) * width + Math.floor(x)) * 4);
    	const down = ((floor(y + 1) * width + Math.floor(x)) * 4);

    	c.r += data[left+0] + data[right+0] + data[up+0] + data[down+0] + data[leftup+0] + data[leftdown+0] + data[rightup+0] + data[rightdown+0];
    	c.g += data[left+1] + data[right+1] + data[up+1] + data[down+1] + data[leftup+1] + data[leftdown+1] + data[rightup+1] + data[rightdown+1];
    	c.b += data[left+2] + data[right+2] + data[up+2] + data[down+2] + data[leftup+2] + data[leftdown+2] + data[rightup+2] + data[rightdown+2];

      c.r/=9;
      c.g/=9;
      c.b/=9;
    }

  return new THREE.Color(
    c.r / 255,
    c.g / 255,
    c.b / 255
  );
}