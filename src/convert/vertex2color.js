import { vertex2imageCoords } from 'src/convert/vertex2imageCoords';
import { state, IMAGE_DATA, OPTIONS } from 'src/services/state';
import { Color } from 'three';

export const vertex2color = ({ x, y }) => {
  const [ix, iy] = vertex2imageCoords(x, y);
  const { data, width, height } = state.get(IMAGE_DATA);
  const { isSmooth } = state.get(OPTIONS);

  const base = (iy * width + ix) * 4;

  let red = data[base + 0];
  let green = data[base + 1];
  let blue = data[base + 2];

  if (isSmooth && ix > 0 && iy > 0 && ix < width - 1 && iy < height - 1) {
    const L = (iy * width + ix - 1) * 4;
    const LU = ((iy - 1) * width + ix - 1) * 4;
    const LD = ((iy + 1) * width + ix - 1) * 4;
    const R = (iy * width + ix + 1) * 4;
    const RU = ((iy - 1) * width + ix + 1) * 4;
    const RD = ((iy + 1) * width + ix + 1) * 4;
    const U = ((iy - 1) * width + ix) * 4;
    const D = ((iy + 1) * width + ix) * 4;

    red += data[L+0] + data[R+0] + data[U+0] + data[D+0] + data[LU+0] + data[LD+0] + data[RU+0] + data[RD+0];
    green += data[L+1] + data[R+1] + data[U+1] + data[D+1] + data[LU+1] + data[LD+1] + data[RU+1] + data[RD+1];
    blue += data[L+2] + data[R+2] + data[U+2] + data[D+2] + data[LU+2] + data[LD+2] + data[RU+2] + data[RD+2];

    red /= 9;
    green /= 9;
    blue /= 9;
  }

  return new Color(
    red / 255,
    green / 255,
    blue / 255.
  );
};
