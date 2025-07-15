export function convertMapToArray<K, V>(map: Map<K, V>) {
   const arr: [K, V][] = Array.from(map, ([key, value]) => [key, value]);
   return arr;
}
