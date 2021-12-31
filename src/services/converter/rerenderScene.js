
import { createPlaneMesh } from 'src/services/meshgen/createPlaneMesh';

import { updateScene } from 'src/services/3d/scene';
import { IMAGE_MATRIX_DATA, state } from 'src/services/state';


// TODO: move this file into adequate folder
export const rerenderScene = () => {
  if (state.get(IMAGE_MATRIX_DATA)) {
    updateScene(createPlaneMesh());
  }
 }