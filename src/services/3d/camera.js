import * as THREE from 'three';

export const camera = new THREE.PerspectiveCamera(
  60, // fov
  window.innerWidth / window.innerHeight, // aspect
  1, // near
  5000 // far
);

camera.position.z = 400;

