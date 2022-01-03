import { MeshBasicMaterial } from 'three';

export const createMaterial = () => {
  return new MeshBasicMaterial({
    wireframe: true,
    vertexColors: true,
  });
};
