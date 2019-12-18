
export function createMap(data) {
  let map = new Map();
  data.forEach(function (element) {
    map.set(element.id, element);
  });
  return map;
}
