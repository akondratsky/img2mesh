import * as THREE from 'three';
import { getBaseGeometry } from './getBaseGeometry';
import { getBrightness } from '../converter/getBrightness';
import { optionsService } from '../options';


export const createPlaneMesh = () => {
  const { width, height, widthSegments, heightSegments, getColorByIndex } = getBaseGeometry();
  const { maxHeight } = optionsService.options;

  const geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
  const material = new THREE.MeshBasicMaterial({
    wireframe: true,
    vertexColors: true,
  });

  // change height of plane
  geometry.vertices.forEach((vertice, index) => {
    const color = getColorByIndex(geometry.vertices, index);
    const brightness = getBrightness(color);
    vertice.setZ(brightness * maxHeight);
  });

  // colorize plane
  geometry.faces.forEach(face => face.vertexColors.push(
    getColorByIndex(geometry.vertices, face.a),
    getColorByIndex(geometry.vertices, face.b),
    getColorByIndex(geometry.vertices, face.c),
  ));

  const plane = new THREE.Mesh(geometry, material);

  return plane;
}