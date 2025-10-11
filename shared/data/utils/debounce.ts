type Timeout = ReturnType<typeof setTimeout>;

export function debounce(fn: any, delayMS: number) {
   let timeout: Timeout | null = null;
   function inner(...args: any) {
      if (timeout) return;
      fn(...args);
      timeout = setTimeout(() => {
         clearTimeout(timeout!);
         timeout = null;
      }, delayMS);
   }

   return inner;
}
