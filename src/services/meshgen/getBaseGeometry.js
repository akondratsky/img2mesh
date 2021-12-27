import { state } from '../state';
import { optionsService } from '../options';
import { getColor } from '../converter/getColor';


const floor = Math.floor;

export const getBaseGeometry = () => {
  const { height, width } = state.getImageData();


  const { pixelStep, maxHeight } = optionsService.options;

  const widthSegments = floor(width / pixelStep);
  const heightSegments = floor(height / pixelStep);
  const depthSegments = floor(maxHeight / pixelStep) + 1;
  
  const depth = floor(depthSegments * pixelStep);

  const xSteps = floor(width / pixelStep);
  const ySteps = floor(height / pixelStep);

  const xStepsHalf = floor(xSteps / 2);
  const yStepsHalf = floor(ySteps / 2);

  const getColorByIndex = (vertices, index) => {
    const vertice = vertices[index];
    const x = xStepsHalf + floor(vertice.x / pixelStep);
    const y = ySteps - yStepsHalf - floor(vertice.y / pixelStep);
    return getColor(x * pixelStep, y * pixelStep);
  };

  return {
    height,
    width,
    depth,
    widthSegments,
    heightSegments,
    depthSegments,
    getColorByIndex,
    maxHeight,
  }
}