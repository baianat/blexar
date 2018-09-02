export default function select (element) {
  if (typeof element === 'string') {
    return document.querySelector(element);
  }
  return element;
}
