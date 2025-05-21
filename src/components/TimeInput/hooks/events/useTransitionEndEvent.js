import { useCallback } from 'react';

export default function useTransitionEndEvent({
   sliderRef,
   offsetRef,
   timerConfig,
   updateOffsetInstantly,
   updateActiveNum,
}) {
   const onTransitionEnd = useCallback(
      e => {
         if (e.target !== sliderRef.current) return;

         let offset = offsetRef.current;

         if (offset < timerConfig.minOffset) {
            offset += timerConfig.timerHeight;
         } else if (offset > timerConfig.maxOffset) {
            offset -= timerConfig.timerHeight;
         }

         updateOffsetInstantly(offset);
         updateActiveNum(offset);
      },
      [
         sliderRef,
         offsetRef,
         timerConfig,
         updateOffsetInstantly,
         updateActiveNum,
      ],
   );

   return { onTransitionEnd };
}
