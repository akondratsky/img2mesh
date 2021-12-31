import { PlaneGeometry, Matrix4, MeshBasicMaterial, Mesh } from 'three';
import { color2Brightness } from 'src/convert/color2Brightness';
import { state, OPTIONS } from 'src/services/state';
import { getMeshParams } from './getMeshParams';
import { vertex2color } from 'src/convert/vertex2color';

export const createPlaneMesh = () => {
  const { width, height, widthSegments, heightSegments } = getMeshParams();

  const geometry = new PlaneGeometry(width, height, widthSegments, heightSegments);

  // let's move it from center (with negative coordinates) to simplify calculations
  geometry.applyMatrix4(new Matrix4().makeTranslation(width / 2, height / 2, 0));


  const heights = []

  // change height of plane
  geometry.vertices.forEach((vertice) => {
    const color = vertex2color(vertice);
    const brightness = color2Brightness(color);
    const maxHeight = state.get(OPTIONS).maxHeight;

    heights.push(brightness * maxHeight);

    vertice.setZ(brightness * maxHeight)
  });

  window.heights = heights;

  // colorize plane
  geometry.faces.forEach(face => face.vertexColors.push(
    vertex2color(geometry.vertices[face.a]),
    vertex2color(geometry.vertices[face.b]),
    vertex2color(geometry.vertices[face.c]),
  ));

  const material = new MeshBasicMaterial({
    wireframe: true,
    vertexColors: true,
  });

  const plane = new Mesh(geometry, material);

  window.plane = plane;
  
  return plane;
}