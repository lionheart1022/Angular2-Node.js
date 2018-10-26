export function exist<T>(item, render=false) {
  if (typeof item !== 'undefined' || item === null) {
    return render ? item : true;
  }
  return render ? '' : false;
}
