import * as THREE from 'three';
import { optionsService } from '../options';
import { getBrightness } from '../converter/getBrightness';
import { getBaseGeometry } from './getBaseGeometry';

/** @returns {THREE.BoxGeometry} */
export const createBoxGeometry = () => {
  const {
    width,
    height,
    depth,
    widthSegments,
    heightSegments,
    depthSegments,
    getColorByIndex
  } = getBaseGeometry();
  const { maxHeight } = optionsService.options;

  const geometry = new THREE.BoxGeometry(
    width, height, depth,
    widthSegments, heightSegments, depthSegments,
  );

  const topZ = getValue('max', 'z', geometry.vertices);

  const topLayer = geometry.vertices.filter((v) => v.z === topZ);

  topLayer.forEach((vertice, index) => {
    const color = getColorByIndex(topLayer, index);
    const brightness = getBrightness(color);
    vertice.setZ(brightness * maxHeight);
  });
  
  return geometry;
};

/**
 * @param {'min' | 'max'} type
 * @param {'x' | 'y' | 'z'} field 
 * @param {THREE.Vector3[]} vertices 
 * @returns 
 */
const getValue = (type, field, vertices) => {
  return vertices.reduce((prev, curr) => {
    if (type === 'max' && curr[field] > prev) return curr[field];
    if (type === 'min' && curr[field] < prev) return curr[field];
    return prev;
  }, vertices[0][field]);
}