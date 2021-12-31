import { camera } from './3d/camera';
import { renderer, controls, render } from 'src/services/3d/renderer';

export const windowResizeHandler = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  controls.handleResize();
  render();
};
