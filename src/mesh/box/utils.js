/**
 * @param {'min' | 'max'} type
 * @param {'x' | 'y' | 'z'} field 
 * @param {THREE.Vector3[]} vertices 
 * @returns 
 */
export const getValue = (type, field, vertices) => {
  return vertices.reduce((prev, curr) => {
    if (type === 'max' && curr[field] > prev) return curr[field];
    if (type === 'min' && curr[field] < prev) return curr[field];
    return prev;
  }, vertices[0][field]);
};
