export class State {
  get(key) {
    return this[key];
  }

  set(key, value) {
    this[key] = value;
  }
}

export const OPTIONS = 'options';
export const IMAGE = 'image';
export const IMAGE_MATRIX_DATA = 'imageMatrixData';

export const state = new State();
