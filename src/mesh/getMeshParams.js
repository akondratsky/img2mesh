import { state, OPTIONS, IMAGE_DATA } from 'src/services/state';


const floor = Math.floor;

export const getMeshParams = () => {
  const { height: iHeight, width: iWidth } = state.get(IMAGE_DATA);
  const { pixelFactor, maxHeight } = state.get(OPTIONS);

  const height = floor(iHeight / pixelFactor) - 1;
  const width = floor(iWidth / pixelFactor) - 1;
  const depth = maxHeight;

  const widthSegments = width;
  const heightSegments = height;
  const depthSegments = floor(maxHeight / pixelFactor);

  if (!widthSegments || !heightSegments) {
    throw new Error('zero segments');
  }

  return {
    height,
    width,
    depth,
    widthSegments,
    heightSegments,
    depthSegments,
  };
};
