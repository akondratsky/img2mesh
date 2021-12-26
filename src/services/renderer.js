import * as THREE from 'three';
import { animate } from './animation';
import TrackballControls from "three-trackballcontrols";
import { camera } from './camera';
import { scene } from './scene';

export const renderer = new THREE.WebGLRenderer({
  antialias: true,
  // clearAlpha: 1,
  // sortObjects: false,
  // sortElements: false
});

// TODO: use it
export const injectRenderer = () => {
  document
    .getElementById('content3d')
    .appendChild(renderer.domElement);
  animate();
};

export const render = () => renderer.render(scene, camera);

export const controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 2.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true; // true == Disable damping

// this is commented code from original addin:
//_controls.dynamicDampingFactor = 0.3;
//_controls.keys = [ 65, 83, 68 ];