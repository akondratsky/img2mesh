import { Mesh } from 'three';
import { createBufferGeometry } from './createBufferGeometry';
import { createMaterial } from './createMaterial';

export const createBufferGeometryMesh = () => {
  const geometry = createBufferGeometry();
  const material = createMaterial();
  return new Mesh(geometry, material);
};
