import { controls, render } from './renderer';

export const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  render();
};
