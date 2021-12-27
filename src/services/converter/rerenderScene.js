import { createPlaneMesh } from '../meshgen/createPlaneMesh';

import { scene } from '../scene';
import { state } from '../state';

export const rerenderScene = () => {
  if (!state.isImageReady()) return;

  const plane = createPlaneMesh();

  scene
    .clear()
    .add(plane);
};

