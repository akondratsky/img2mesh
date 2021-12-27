import * as THREE from 'three';
import { state } from '../state';
import { optionsService } from '../options';
import { getBrightness } from './getBrightness';
import { getColor } from './getColor';
import { render } from '../renderer';

const floor = Math.floor;

export const export2fusion = () => {
  render();

  const imageData = state.getImageData();

  if (!imageData) return;

  const { height, width } = imageData;
  const { pixelStep, meshStep, maxHeight } = optionsService.options;

  const widthSegments = floor(width / pixelStep);
  const heightSegments = floor(height / pixelStep);
  const depthSegments = floor(maxHeight / pixelStep) + 1;

  const xSteps = floor(width / pixelStep);
  const ySteps = floor(height / pixelStep);

  const depth = floor(depthSegments * pixelStep);

  const xStepsHalf = floor(xSteps / 2);
  const yStepsHalf = floor(ySteps / 2);

  const geometry = new THREE.BoxGeometry(
    width, height, depth,
    widthSegments, heightSegments, depthSegments,
  );

  const topZ = geometry.vertices.reduce((prev, { z }) => {
    return z > prev ? z : prev;
  }, geometry.vertices[0].z);

  const topLayer = geometry.vertices.filter((v) => v.z === topZ);

  const getTopLayerColorByIndex = (index) => {
    const vertice = topLayer[index];
    const x = xStepsHalf + floor(vertice.x / pixelStep);
    const y = ySteps - yStepsHalf - floor(vertice.y / pixelStep);
    return getColor(x * pixelStep, y * pixelStep);
  };

  topLayer.forEach((vertice, index) => {
    const color = getTopLayerColorByIndex(index);
    const brightness = getBrightness(color);
    vertice.setZ(brightness * maxHeight);
  });


  let meshString = '';
  geometry.vertices.forEach((v) => {
    meshString += `v ${v.x.toFixed(6)} ${v.y.toFixed(6)} ${v.z.toFixed(6)}
    `;
  });

  // eslint-disable-next-line
  neutronJavaScriptObject.executeQuery('send', JSON.stringify({
    obj: meshString
  }));
};
