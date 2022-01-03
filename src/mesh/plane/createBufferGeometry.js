import { BufferGeometry } from 'three';
import { createGeometry } from './createGeometry';

export const createBufferGeometry = () => {
  return new BufferGeometry().fromGeometry(createGeometry());
};
