import { strictOptional } from '@shared/data/types/helperTypes';

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

export default cleanUndefined;
