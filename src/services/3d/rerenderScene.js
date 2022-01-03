
import { createMesh } from 'src/mesh/plane';
import { updateScene, lookAtObject } from 'src/services/3d/scene';
import { IMAGE_DATA, state } from 'src/services/state';

export const rerenderScene = ({ fitView }) => {
  if (state.get(IMAGE_DATA)) {
    const mesh = createMesh();
    updateScene(mesh);
    if (fitView) lookAtObject(mesh);
  }
};
