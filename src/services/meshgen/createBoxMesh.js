import * as THREE from 'three';
import { createBoxGeometry } from "./createBoxGeometry"

export const createBoxMesh = () => {
  const geometry = createBoxGeometry();
  const material = new THREE.MeshBasicMaterial({
    wireframe: true,
  });

  return new THREE.Mesh(geometry, material);
}