import { vertex2imageCoords } from 'src/convert/vertex2imageCoords';
import { state, IMAGE_MATRIX_DATA } from 'src/services/state';

export const vertex2color = ({ x, y }) => {
  const [ix, iy] = vertex2imageCoords(x, y);
  const rgbMatrix = state.get(IMAGE_MATRIX_DATA).rgbPixelMatrix;
  return rgbMatrix[ix][iy];
}