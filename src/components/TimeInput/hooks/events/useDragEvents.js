import { useRef, useCallback } from 'react';
import getNearestMultiple from '../../utils/getNearestMultiple';

export default function useDragEvents({
   offsetRef,
   timerConfig,
   updateOffset,
   updateActiveNum,
}) {
   const isMouseDown = useRef(false);
   const mouseStartPos = useRef(0);
   const baseOffset = useRef(0);

   const onMouseDown = useCallback(
      e => {
         if (e.button !== 0) return;
         isMouseDown.current = true;
         mouseStartPos.current = e.clientY;
         baseOffset.current = offsetRef.current;
      },
      [offsetRef],
   );

   const onMouseMove = useCallback(
      e => {
         if (!isMouseDown.current) return;
         const dragOffset =
            baseOffset.current +
            (mouseStartPos.current - e.clientY) * timerConfig.speedFactor;

         if (
            isOffsetOutOfRange(
               dragOffset,
               timerConfig.timerHeight,
               timerConfig.numHeight,
            )
         ) {
            return;
         }

         updateOffset(dragOffset);
         updateActiveNum(dragOffset);
      },
      [updateOffset, updateActiveNum, timerConfig],
   );

   const onMouseUp = useCallback(() => {
      if (!isMouseDown.current) return;
      isMouseDown.current = false;

      const roundedOffset = getNearestMultiple(
         offsetRef.current,
         timerConfig.numHeight,
      );
      updateOffset(roundedOffset);
      updateActiveNum(roundedOffset);
   }, [offsetRef, updateOffset, updateActiveNum, timerConfig]);

   return { onMouseDown, onMouseMove, onMouseUp };
}

function isOffsetOutOfRange(offset, timerHeight, numHeight) {
   return offset < timerHeight * -2 + numHeight * 2 || offset > 0;
}
