export function assertDivEl(el: Element | null): asserts el is HTMLDivElement {
   if (!el || !(el instanceof HTMLDivElement)) {
      throw new Error('Expected HTMLDivElement');
   }
}
