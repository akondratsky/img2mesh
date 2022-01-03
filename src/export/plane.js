
import { IMAGE_DATA, state } from 'src/services/state';
import { render } from 'src/services/3d/renderer';
import { createGeometry } from 'src/mesh/plane';
import { vertices2normals } from 'src/convert/vertices2normals';
import { fuse } from 'src/fuse';


export const exportPlane = () => {
  render();

  if (!state.get(IMAGE_DATA)) return;

  const geometry = createGeometry();;
  const normals = vertices2normals(geometry.vertices);

  // convert geometry to string
  let meshString = '';
  geometry.vertices.forEach((v, i) => {
    const n = normals[i];
    meshString += `v ${v.x.toFixed(6)} ${v.y.toFixed(6)} ${v.z.toFixed(6)}\n`;
    meshString += `vn ${n.x.toFixed(6)} ${n.y.toFixed(6)} ${n.z.toFixed(6)}\n`;
  });

  geometry.faces.forEach(({ a, b, c }) => {
    meshString += `f ${a + 1}//${a + 1} ${b + 1}//${b + 1} ${c + 1}//${c + 1}`;
    meshString += '\n';
  });

  fuse(meshString);
};
