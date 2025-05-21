import './style.css';
import { useRef, useEffect, useMemo } from 'react';
import Number from './Number';

import useActiveNum from './hooks/useActiveNum';
import useOffset from './hooks/useOffset';
import useTimeInputEvents from './hooks/events/useTimeInputEvents';

function getTimerConfig(numCount, fontSize, initialNum) {
   const numHeight = 3.75 * fontSize;
   const timerHeight = numHeight * numCount;
   const minOffset = timerHeight * -1.5;
   const maxOffset = timerHeight * -0.5;
   const speedFactor = 2.5;

   const baseOffset = timerHeight * -1 + numHeight;
   const initialOffset = baseOffset - initialNum * numHeight;
   return {
      numCount,
      numHeight,
      timerHeight,
      minOffset,
      maxOffset,
      speedFactor,
      initialNum,
      initialOffset,
   };
}

const TimeInput = ({
   numCount = 60,
   fontSize = 16,
   updateInput,
   initialNum = 0,
}) => {
   const timerConfig = useMemo(
      () => getTimerConfig(numCount, fontSize, initialNum),
      [numCount, fontSize, initialNum],
   );

   const [activeNum, updateActiveNum, updateActiveNumDebounce] = useActiveNum(
      timerConfig,
      updateInput,
   );
   const sliderRef = useRef(null);
   const [offsetRef, updateOffset, updateOffsetInstantly] =
      useOffset(sliderRef);

   const handleEvent = useTimeInputEvents({
      sliderRef,
      offsetRef,
      timerConfig,
      activeNum,
      updateOffset,
      updateOffsetInstantly,
      updateActiveNum,
      updateActiveNumDebounce,
   });

   useEffect(() => {
      updateOffsetInstantly(timerConfig.initialOffset);
      updateActiveNum(timerConfig.initialOffset);
   }, [timerConfig.initialOffset, updateOffsetInstantly, updateActiveNum]);

   useEffect(() => {
      const sliderEl = sliderRef.current;
      const controller = new AbortController();
      const signal = controller.signal;

      sliderEl.addEventListener('transitionend', handleEvent, { signal });
      sliderEl.addEventListener('wheel', handleEvent, { signal });
      sliderEl.addEventListener('click', handleEvent, { signal });
      sliderEl.addEventListener('mousedown', handleEvent, { signal });
      document.addEventListener('mousemove', handleEvent, { signal });
      document.addEventListener('mouseup', handleEvent, { signal });

      return () => controller.abort();
   }, [handleEvent]);

   return (
      <div className="timer" style={{ fontSize }}>
         <div ref={sliderRef}>
            {Array.from({ length: timerConfig.numCount * 2 }).map((_, i) => {
               const num = i % timerConfig.numCount;
               return <Number key={i} num={num} active={num === activeNum} />;
            })}
         </div>
      </div>
   );
};

export default TimeInput;
