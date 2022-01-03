import { createBufferGeometryMesh } from 'src/mesh/box/createBufferGeometryMesh';
import { fuse } from 'src/fuse';
import { objExporter } from 'src/objExporter';


export const exportPlane2obj = () => {
  const string = objExporter.parse(
    createBufferGeometryMesh()
  );
  fuse(string);
};
