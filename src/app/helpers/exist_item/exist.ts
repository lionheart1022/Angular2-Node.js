export function exist<T>(item) {
  if (typeof item !== 'undefined') {
    return true;
  }
  return false;
}
