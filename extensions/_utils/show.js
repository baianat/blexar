export default function show (el) {
  el.classList.add('is-visible');
  el.classList.remove('is-hidden');
  el.setAttribute('aria-hidden', 'false');
}
