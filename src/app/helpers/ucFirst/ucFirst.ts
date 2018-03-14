export function ucFirst(string: string) {
  if (typeof string !== 'undefined') {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
