import { Box3, Scene, Vector3 } from 'three';
import { camera } from 'src/services/3d/camera';
import { controls } from 'src/services/3d/renderer';


export const scene = new Scene();

export const updateScene = (object) => {
  scene.clear().add(object);
  fitView(object);
}

const OFFSET = 10.25;

export const fitView = (object) => {
  const boundingBox = new Box3();
  const center = new Vector3();
  const size = new Vector3();
  
  // get bounding box of object - this will be used to setup controls and camera
  boundingBox.setFromObject(object);
  boundingBox.getCenter(center);
  boundingBox.getSize(size);

  // get the max side of the bounding box (fits to width OR height as needed )
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * ( Math.PI / 180 );
  let cameraZ = Math.abs(maxDim / 4 * Math.tan( fov * 2 ));

  cameraZ *= OFFSET; // zoom out a little so that objects don't fill the screen

  camera.position.z = cameraZ;

  const minZ = boundingBox.min.z;
  const cameraToFarEdge = ( minZ < 0 ) ? -minZ + cameraZ : cameraZ - minZ;

  camera.far = cameraToFarEdge * 3;
  camera.updateProjectionMatrix();

  // set camera to rotate around center of loaded object
  controls.target = center;
  // prevent camera from zooming out far enough to create far plane cutoff
  controls.maxDistance = cameraToFarEdge * 2;
}