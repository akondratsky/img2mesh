import * as THREE from 'three';
import { scene } from '../scene';
import { state } from '../state';
import { optionsService } from '../options';
import { getBrightness } from './getBrightness';
import { getColor } from './getColor';

const floor = Math.floor;

export const drawLines = () => {
  const imageData = state.getImageData();

  if (!imageData) return;

  const { height, width } = imageData;
  const { pixelStep, meshStep, maxHeight } = optionsService.options;

  const widthSegments = floor(width / pixelStep);
  const heightSegments = floor(height / pixelStep);
  const xSteps = floor(width / pixelStep);
  const ySteps = floor(height / pixelStep);
  const xStepsHalf = floor(xSteps / 2);
  const yStepsHalf = floor(ySteps / 2);

  const geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
  const material = new THREE.MeshBasicMaterial({
    wireframe: true,
    vertexColors: THREE.VertexColors,
  });

  const getColorByIndex = (index) => {
    const vertice = geometry.vertices[index];
    const x = xStepsHalf + floor(vertice.x / pixelStep);
    const y = ySteps - yStepsHalf - floor(vertice.y / pixelStep);
    return getColor(x * pixelStep, y * pixelStep);
  };

  geometry.vertices.forEach((vertice, index) => {
    const color = getColorByIndex(index);
    const brightness = getBrightness(color);
    vertice.setZ(brightness * maxHeight);
  });

  geometry.faces.forEach(face => face.vertexColors.push(
    getColorByIndex(face.a),
    getColorByIndex(face.b),
    getColorByIndex(face.c),
  ));

  scene
    .clear()
    .add(new THREE.Mesh(geometry, material));
};

