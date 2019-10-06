export default function call (func, args = null) {
  if (typeof func === 'function') {
    func(args);
  }
}
