import { Mesh } from 'three';
import { createGeometry } from './createGeometry';
import { createMaterial } from './createMaterial';

export const createMesh = () => {
  const geometry = createGeometry();
  const material = createMaterial();

  return new Mesh(geometry, material); 
};
