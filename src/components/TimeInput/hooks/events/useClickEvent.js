import { useCallback } from 'react';

export default function useClickEvent({
   offsetRef,
   activeNum,
   timerConfig,
   updateOffset,
   updateActiveNum,
}) {
   const onClick = useCallback(
      e => {
         if (e.target.classList.contains('num-active')) return;
         if (!e.target.classList.contains('number')) return;

         const num = parseInt(e.target.textContent);
         const offset = getOffsetAfterClick(
            offsetRef.current,
            num,
            activeNum,
            timerConfig.numCount,
            timerConfig.numHeight,
         );

         updateOffset(offset);
         updateActiveNum(offset);
      },
      [offsetRef, activeNum, timerConfig, updateOffset, updateActiveNum],
   );

   return { onClick };
}

function getOffsetAfterClick(offset, num, activeNum, numCount, numHeight) {
   if (num === numCount - 1 && activeNum === 0) return offset + numHeight;
   if (num === 0 && activeNum === numCount - 1) return offset - numHeight;
   return num < activeNum ? offset + numHeight : offset - numHeight;
}
