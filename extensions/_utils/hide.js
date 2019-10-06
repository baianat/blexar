export default function hide (el) {
  el.classList.remove('is-visible');
  el.classList.add('is-hidden');
  el.setAttribute('aria-hidden', 'true');
}
