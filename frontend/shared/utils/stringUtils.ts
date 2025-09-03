export function capitalize(string: string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

export function compareStrings(str1: string, str2: string) {
   return str1.localeCompare(str2, undefined, {
      sensitivity: 'base',
      numeric: true,
   });
}
