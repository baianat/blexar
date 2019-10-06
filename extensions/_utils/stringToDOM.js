export default function stringToDOM (string) {
  return document.createRange().createContextualFragment(string).firstElementChild;
}
