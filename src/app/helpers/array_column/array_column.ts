export function arrayColumn(arr, n) {
  return arr.map(x => {
    return x[Object.keys(x)[n]];
    // x[n]
  });
}
