import { state, OPTIONS, IMAGE_MATRIX_DATA } from 'src/services/state';


const floor = Math.floor;

export const getMeshParams = () => {
  const { height: iHeight, width: iWidth } = state.get(IMAGE_MATRIX_DATA);
  const { pixelFactor, maxHeight } = state.get(OPTIONS);

  const height = floor(iHeight / pixelFactor) - 1;
  const width = floor(iWidth / pixelFactor) - 1;
  const depth = maxHeight;

  const widthSegments = width;
  const heightSegments = height;
  const depthSegments = floor(maxHeight / pixelFactor);

  return {
    height,
    width,
    depth,
    widthSegments,
    heightSegments,
    depthSegments,
  }
}