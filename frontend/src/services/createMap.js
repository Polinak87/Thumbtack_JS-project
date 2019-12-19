
export function createMap(data) {
  if (data instanceof Array) {
    let map1 = new Map();
    data.forEach(function (element) {
      map1.set(element.id, element);
    });
    return map1;
  }
  if (data instanceof Object) {
    let map2 = new Map();
    map2.set(data.id, data);
    return map2;
  }
  return new Map;
}