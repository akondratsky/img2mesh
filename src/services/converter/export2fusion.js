
import { IMAGE_MATRIX_DATA, state } from '../state';
import { render } from '../3d/renderer';
import { createBoxGeometry } from '../meshgen/createBoxGeometry';
import { createPlaneMesh } from '../meshgen/createPlaneMesh';


export const export2fusion = () => {
  render();

  if (!state.get(IMAGE_MATRIX_DATA)) return;

  // const geometry = createBoxGeometry();

  const plane = createPlaneMesh();

  const geometry = plane.geometry;


  geometry.computeVertexNormals();

  // convert geometry to string
  let meshString = '';
  geometry.vertices.forEach((v) => {
    meshString += `v ${v.x.toFixed(6)} ${v.y.toFixed(6)} ${v.z.toFixed(6)}
    `;
  });

  // experiment - trying to insert normals
  geometry.faces.forEach((face) => {
    face.vertexNormals.forEach((v) => {
      meshString += `vn ${v.x.toFixed(6)} ${v.y.toFixed(6)} ${v.z.toFixed(6)}
      `
    })
  });

  // export string to fusion360
  // eslint-disable-next-line
  neutronJavaScriptObject.executeQuery('send', JSON.stringify({
    obj: meshString
  }));
};
