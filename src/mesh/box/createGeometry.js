import { BoxGeometry, Matrix4 } from 'three';

import { state, OPTIONS } from 'src/services/state';
import { color2Brightness } from 'src/convert/color2Brightness';
import { getMeshParams } from 'src/mesh/getMeshParams';
import { vertex2color } from 'src/convert/vertex2color';

import { getValue } from './utils';


/** @returns {BoxGeometry} */
export const createGeometry = () => {
  const {
    width,
    height,
    depth,
    widthSegments,
    heightSegments,
    depthSegments,
  } = getMeshParams();

  const { maxHeight } = state.get(OPTIONS);

  const geometry = new BoxGeometry(
    width, height, depth,
    widthSegments, heightSegments, depthSegments,
  );

  // let's move it from center (with negative coordinates) to simplify calculations
  geometry.applyMatrix4(new Matrix4().makeTranslation(width / 2, height / 2, 0));

  const topZ = getValue('max', 'z', geometry.vertices);

  const topLayer = geometry.vertices.filter((v) => v.z === topZ);

  topLayer.forEach((vertice, index) => {
    const color = vertex2color(topLayer[index]);
    const brightness = color2Brightness(color);
    vertice.setZ(brightness * maxHeight);
  });

  return geometry;
};

