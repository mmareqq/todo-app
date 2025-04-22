import { useCallback, useRef } from 'react';

export default function useOffset(sliderRef) {
   const offsetRef = useRef(null);

   const updateOffset = useCallback(
      newOffset => {
         offsetRef.current = newOffset;
         updateDOMOffset(sliderRef.current, offsetRef.current);
      },
      [sliderRef]
   );

   const updateOffsetInstantly = useCallback(
      newOffset => {
         const el = sliderRef.current;
         disableAnimation(el);
         void el.offsetWidth; // Forces layout recalculation

         updateOffset(newOffset);

         void el.offsetWidth;
         enableAnimation(el);
      },
      [sliderRef, updateOffset]
   );

   return [offsetRef, updateOffset, updateOffsetInstantly];
}

function disableAnimation(el) {
   el.style.transition = 'none';
}

function enableAnimation(el) {
   el.style.transition = 'var(--timerTransition)';
}

function updateDOMOffset(el, offset) {
   el.style.translate = `0 ${offset}px`;
}
