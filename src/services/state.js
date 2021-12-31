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
export const IMAGE_CONTEXT_DATA = 'imagecontextdata';
export const IMAGE_DATA = 'imageData';

export const state = new State();
