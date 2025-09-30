export const toSnakeCase = (s: string) => {
   return s.replace(/[A-Z]/g, c => '_' + c.toLowerCase());
};

export const toCamelCase = (s: string) => {
   return s.toLowerCase().replace(/(_[a-z])/g, s => s[1].toUpperCase());
};

export const transformToDB = (object: Record<string, any>) => {
   const entries = Object.entries(object).map(([key, value]) => {
      return [toSnakeCase(key), value];
   });
   return Object.fromEntries(entries);
};

export const transformFromDB = (object: Record<string, any>) => {
   const entries = Object.entries(object).map(([key, value]) => {
      return [toCamelCase(key), value];
   });
   return Object.fromEntries(entries);
};
