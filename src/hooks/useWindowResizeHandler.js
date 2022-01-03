import { camera } from '../services/3d/camera';
import { renderer, controls, render } from 'src/services/3d/renderer';
import { useCallback } from 'react';

export const useWindowResizeHandler = () => useCallback(() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  controls.handleResize();
  render();
}, []);
