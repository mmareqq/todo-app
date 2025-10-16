import { formatDate } from '@shared/data/utils/formatDate';

export const toSnakeCase = (s: string) => {
   return s.replace(/[A-Z]/g, c => '_' + c.toLowerCase());
};

export const toCamelCase = (s: string) => {
   return s.toLowerCase().replace(/(_[a-z])/g, s => s[1].toUpperCase());
};

function assertValue<T>(value: unknown, type: T): asserts value is T {
   if (typeof value === type) {
      throw new Error(`assert value is not of type ${type}`);
   }
}

export const transformToDB = <T extends Record<string, T[keyof T]>>(
   object: T,
) => {
   const entries = Object.entries(object).map(([key, value]) => {
      const newKey = toSnakeCase(key);

      if (key === 'dueDate' && value !== null) {
         assertValue(value, 'date');
         return [newKey, new Date(value)];
      }
      return [newKey, value];
   });
   return Object.fromEntries(entries);
};

export const transformFromDB = (object: Record<string, any>) => {
   const entries = Object.entries(object).map(([key, value]) => {
      if (value instanceof Date) return [toCamelCase(key), formatDate(value)];
      return [toCamelCase(key), value];
   });
   return Object.fromEntries(entries);
};
