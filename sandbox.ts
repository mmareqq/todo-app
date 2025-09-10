const obj = { a: undefined, b: 234, c: undefined, d: null };
const cleanUndefined = <T extends Record<string, T[keyof T]>>(
   obj: T,
): strictOptional<T> => {
   type Val = T[keyof T];

   const cleanObj: Record<string, Val> = {};
   for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) cleanObj[key] = value;
   }
   return cleanObj as strictOptional<T>;
};
console.log('asdf');
console.log(cleanUndefined(obj));

type strictOptional<T> = {
   [K in keyof T]?: Exclude<T[K], undefined>;
};
