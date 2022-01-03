import { PlaneGeometry, Matrix4 } from 'three';
import { color2Brightness } from 'src/convert/color2Brightness';
import { state, OPTIONS } from 'src/services/state';
import { getMeshParams } from 'src/mesh/getMeshParams';
import { vertex2color } from 'src/convert/vertex2color';


export const createGeometry = () => {
  const { width, height, widthSegments, heightSegments } = getMeshParams();
  const { maxHeight, isColorizedView } = state.get(OPTIONS);


  const geometry = new PlaneGeometry(width, height, widthSegments, heightSegments);

  // let's move it from center (with negative coordinates) to simplify calculations
  geometry.applyMatrix4(new Matrix4().makeTranslation(width / 2, height / 2, 0));

  // change height of plane
  geometry.vertices.forEach((vertice) => {
    const color = vertex2color(vertice);
    const brightness = color2Brightness(color);

    const z = brightness * maxHeight;

    vertice.setZ(z);
  });

  if (isColorizedView) {
    // colorize plane
    geometry.faces.forEach(face => face.vertexColors.push(
      vertex2color(geometry.vertices[face.a]),
      vertex2color(geometry.vertices[face.b]),
      vertex2color(geometry.vertices[face.c]),
    ));
  }

  return geometry;
};