/**
 * Converts an array-like object to an array.
 */
export default function toArray (arrayLike, mappingFn) {
  if (Array.from) {
    return Array.from(arrayLike, mappingFn);
  }

  const array = [];
  const shouldMap = typeof mappingFn === 'function';
  const length = arrayLike.length;
  for (let i = 0; i < length; i++) {
    array.push(shouldMap ? mappingFn(arrayLike[i]) : arrayLike[i]);
  }

  return array;
}
