import { useRef, useEffect, memo, useCallback, useMemo } from 'react';
import './style.css';
import Number from './Number';
import getNearestMultiple from './utils/getNearestMultiple';

import useActiveNum from './hooks/useActiveNum';
import useOffset from './hooks/useOffset';

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

const MemoizedNumber = memo(Number);

function TimeInput({
   numCount = 60,
   fontSize = 16,
   updateInput,
   initialNum = 0,
}) {
   const timerConfig = useMemo(
      () => getTimerConfig(numCount, fontSize, initialNum),
      [numCount, fontSize, initialNum]
   );
   const sliderRef = useRef(null);
   const isMouseDown = useRef(false);
   const [offsetRef, updateOffset, updateOffsetInstantly] =
      useOffset(sliderRef);
   const [activeNum, updateActiveNum, updateActiveNumDebounce] = useActiveNum(
      timerConfig,
      updateInput
   );

   const mouseStartPos = useRef();
   const baseOffset = useRef();

   const handleTransitionEnd = useCallback(
      e => {
         if (isMouseDown.current) return;

         if (e.target !== sliderRef.current) return;

         let offset = offsetRef.current;
         if (offset < timerConfig.minOffset) offset += timerConfig.timerHeight;
         if (offset > timerConfig.maxOffset) offset -= timerConfig.timerHeight;

         updateOffsetInstantly(offset);
         updateActiveNum(offset);
      },
      [offsetRef, updateOffsetInstantly, updateActiveNum, timerConfig]
   );

   const handleScroll = useCallback(
      e => {
         if (isMouseDown.current) return;
         let scrollOffset = offsetRef.current;
         if (e.deltaY > 0) scrollOffset -= timerConfig.numHeight;
         else scrollOffset += timerConfig.numHeight;

         // Block infinite scroll
         const clampedOffset = getClampedOffset(
            scrollOffset,
            timerConfig.timerHeight
         );
         if (scrollOffset !== clampedOffset) {
            scrollOffset = clampedOffset;
            updateOffsetInstantly(scrollOffset);
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
      ]
   );

   const handleClick = useCallback(
      e => {
         if (e.target.classList.contains('num-active')) return;
         if (!e.target.classList.contains('number')) return;
         const num = parseInt(e.target.textContent);
         const offset = getOffsetAfterClick(
            offsetRef.current,
            num,
            activeNum,
            timerConfig.numCount,
            timerConfig.numHeight
         );

         updateOffset(offset);
         updateActiveNum(offset);
      },
      [offsetRef, updateOffset, activeNum, updateActiveNum, timerConfig]
   );

   const handleMouseDown = useCallback(
      e => {
         if (e.button !== 0) return;
         isMouseDown.current = true;
         mouseStartPos.current = e.clientY;
         baseOffset.current = offsetRef.current;
      },
      [offsetRef]
   );

   const handleMouseMove = useCallback(
      e => {
         if (!isMouseDown.current) return;
         const dragOffset =
            baseOffset.current +
            (mouseStartPos.current - e.clientY) * timerConfig.speedFactor;
         if (
            isOffsetOutOfRange(
               dragOffset,
               timerConfig.timerHeight,
               timerConfig.numHeight
            )
         ) {
            return;
         }
         updateOffset(dragOffset);
         updateActiveNum(dragOffset);
      },
      [updateOffset, updateActiveNum, timerConfig]
   );

   const handleMouseUp = useCallback(() => {
      if (!isMouseDown.current) return;
      isMouseDown.current = false;
      // Round an offset to center a number
      const roundedOffset = getNearestMultiple(
         offsetRef.current,
         timerConfig.numHeight
      );
      updateOffset(roundedOffset);
      updateActiveNum(roundedOffset);
   }, [updateOffset, updateActiveNum, offsetRef, timerConfig]);

   const handleEvent = useCallback(
      e => {
         switch (e.type) {
            case 'transitionend':
               handleTransitionEnd(e);
               break;
            case 'wheel':
               handleScroll(e);
               break;
            case 'click':
               handleClick(e);
               break;
            case 'mousedown':
               handleMouseDown(e);
               break;
            case 'mousemove':
               handleMouseMove(e);
               break;
            case 'mouseup':
               handleMouseUp();
         }
      },
      [
         handleTransitionEnd,
         handleScroll,
         handleClick,
         handleMouseDown,
         handleMouseMove,
         handleMouseUp,
      ]
   );

   // Initalize
   useEffect(() => {
      updateOffsetInstantly(timerConfig.initialOffset);
      updateActiveNum(timerConfig.initialOffset);
   }, []);

   // Event listeners
   useEffect(() => {
      const sliderEl = sliderRef.current;

      sliderEl.addEventListener('transitionend', handleEvent);
      sliderEl.addEventListener('wheel', handleEvent);
      sliderEl.addEventListener('click', handleEvent);
      sliderEl.addEventListener('mousedown', handleEvent);
      document.addEventListener('mousemove', handleEvent);
      document.addEventListener('mouseup', handleEvent);

      return () => {
         sliderEl.removeEventListener('transitionend', handleEvent);
         sliderEl.removeEventListener('wheel', handleEvent);
         sliderEl.removeEventListener('click', handleEvent);
         sliderEl.removeEventListener('mousedown', handleEvent);
         document.removeEventListener('mousemove', handleEvent);
         document.removeEventListener('mouseup', handleEvent);
      };
   }, [handleEvent]);

   return (
      <div className="timer" style={{ fontSize: fontSize }}>
         <div ref={sliderRef}>
            {Array.from({ length: timerConfig.numCount * 2 }).map((_, i) => {
               const num = i % timerConfig.numCount;
               return (
                  <MemoizedNumber
                     key={i}
                     num={num}
                     active={num === activeNum}
                  />
               );
            })}
         </div>
      </div>
   );
}

function getClampedOffset(offset, timerHeight) {
   if (offset < timerHeight * -2) {
      return offset % timerHeight;
   }
   if (offset > 0) {
      return timerHeight * -1 - offset;
   }
   return offset;
}

function isOffsetOutOfRange(offset, timerHeight, numHeight) {
   if (offset < timerHeight * -2 + numHeight * 2) return true;
   if (offset > 0) return true;
   return false;
}

function getOffsetAfterClick(offset, num, activeNum, numCount, numHeight) {
   if (num === numCount - 1 && activeNum === 0) return offset + numHeight;
   else if (num === 0 && activeNum === numCount - 1) return offset - numHeight;
   else if (num < activeNum) return offset + numHeight;
   else if (num > activeNum) return offset - numHeight;
}

export default TimeInput;
