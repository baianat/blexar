export default function async (callback) {
  setTimeout(() => callback(), 1000 / 60);
}
