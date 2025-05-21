import { useCallback } from 'react';

export default function useWheelEvent({
   offsetRef,
   timerConfig,
   updateOffset,
   updateOffsetInstantly,
   updateActiveNumDebounce,
}) {
   const onWheel = useCallback(
      e => {
         let scrollOffset = offsetRef.current;

         if (e.deltaY > 0) scrollOffset -= timerConfig.numHeight;
         else scrollOffset += timerConfig.numHeight;

         const clampedOffset = getClampedOffset(
            scrollOffset,
            timerConfig.timerHeight,
         );

         if (scrollOffset !== clampedOffset) {
            updateOffsetInstantly(clampedOffset);
         } else {
            updateOffset(scrollOffset);
         }

         updateActiveNumDebounce(scrollOffset);
      },
      [
         offsetRef,
         updateOffset,
         updateOffsetInstantly,
         updateActiveNumDebounce,
         timerConfig,
      ],
   );

   return { onWheel };
}

function getClampedOffset(offset, timerHeight) {
   if (offset < timerHeight * -2) return offset % timerHeight;
   if (offset > 0) return timerHeight * -1 - offset;
   return offset;
}
