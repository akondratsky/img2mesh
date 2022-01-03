import { getMeshParams } from 'src/mesh/getMeshParams';
import { Vector3 } from 'three';


export const vertices2normals = (vertices) => {
  const { widthSegments, heightSegments } = getMeshParams();
  const normals = vertices.map(() => new Vector3());

  for (let y = 0; y < heightSegments - 1; ++y) {
    for (let x = 0; x < widthSegments - 1; ++x) {

      // Calc the values for the two triangles that form a quad
      const iTL = x + y * widthSegments;
      const iTR = (x + 1) + y * widthSegments;
      const iBL = x + (y + 1) * widthSegments;
      const iBR = (x + 1) + (y + 1) * widthSegments;

      // Tri face 1 (a->b a->c)
      const v1ba = new Vector3().subVectors(vertices[iTR], vertices[iTL]);
      const v1ca = new Vector3().subVectors(vertices[iBL], vertices[iTL]);
      const vnorm1 = new Vector3().crossVectors(v1ba, v1ca);

      normals[iTL].add(vnorm1);
      normals[iTR].add(vnorm1);
      normals[iBL].add(vnorm1);

      // Tri face 2 (a->b a->c)
      const v2ba = new Vector3().subVectors(vertices[iTR], vertices[iBR]);
      const v2ca = new Vector3().subVectors(vertices[iBL], vertices[iBR]);
      const vnorm2 = new Vector3().crossVectors(v2ba, v2ca);

      normals[iBR].add(vnorm2);
      normals[iTR].add(vnorm2);
      normals[iBL].add(vnorm2);
    }
  }

  return normals;
}