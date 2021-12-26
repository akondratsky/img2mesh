import { camera } from './camera';
import { renderer, controls, render } from './renderer';
import { scene } from './scene'; 

// onWindowResize
export const windowResizeHandler = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  controls.handleResize();
  render();
}