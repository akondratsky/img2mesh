import * as THREE from 'three';
import { state, OPTIONS } from 'src/services/state';
import { color2Brightness } from 'src/convert/color2Brightness';

import { getMeshParams } from 'src/services/meshgen/getMeshParams';
import { getVertexColor } from '../converter/getVertexColor';

/** @returns {THREE.BoxGeometry} */
export const createBoxGeometry = () => {
  const {
    width,
    height,
    depth,
    widthSegments,
    heightSegments,
    depthSegments,
  } = getMeshParams();
  const { maxHeight } = state.get(OPTIONS);

  const geometry = new THREE.BoxGeometry(
    width, height, depth,
    widthSegments, heightSegments, depthSegments,
  );

  const topZ = getValue('max', 'z', geometry.vertices);

  const topLayer = geometry.vertices.filter((v) => v.z === topZ);

  topLayer.forEach((vertice, index) => {
    const color = getVertexColor(topLayer[index]);
    const brightness = color2Brightness(color);
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