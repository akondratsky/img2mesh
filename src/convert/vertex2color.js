import { vertex2imageCoords } from 'src/convert/vertex2imageCoords';
import { state, IMAGE_DATA } from 'src/services/state';
import { Color } from 'three';

export const vertex2color = ({ x, y }) => {
  const [ix, iy] = vertex2imageCoords(x, y);
  const { data, width } = state.get(IMAGE_DATA);
  const base = (ix * width + iy) * 4;

  return new Color(
    data[base + 0] / 255,
    data[base + 1] / 255,
    data[base + 2] / 255.
  );
};
