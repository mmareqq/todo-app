import useDragEvents from './useDragEvents';
import useWheelEvent from './useWheelEvent';
import useClickEvent from './useClickEvent';
import useTransitionEndEvent from './useTransitionEndEvent';

export default function useTimeInputEvents({
   sliderRef,
   offsetRef,
   timerConfig,
   activeNum,
   updateOffset,
   updateOffsetInstantly,
   updateActiveNum,
   updateActiveNumDebounce,
}) {
   const { onMouseDown, onMouseMove, onMouseUp } = useDragEvents({
      offsetRef,
      timerConfig,
      updateOffset,
      updateActiveNum,
   });

   const { onWheel } = useWheelEvent({
      offsetRef,
      timerConfig,
      updateOffset,
      updateOffsetInstantly,
      updateActiveNumDebounce,
   });

   const { onClick } = useClickEvent({
      offsetRef,
      activeNum,
      timerConfig,
      updateOffset,
      updateActiveNum,
   });

   const { onTransitionEnd } = useTransitionEndEvent({
      sliderRef,
      offsetRef,
      timerConfig,
      updateOffsetInstantly,
      updateActiveNum,
   });

   const handleEvent = e => {
      switch (e.type) {
         case 'mousedown':
            onMouseDown(e);
            break;
         case 'mousemove':
            onMouseMove(e);
            break;
         case 'mouseup':
            onMouseUp(e);
            break;
         case 'wheel':
            onWheel(e);
            break;
         case 'click':
            onClick(e);
            break;
         case 'transitionend':
            onTransitionEnd(e);
            break;
         default:
            break;
      }
   };

   return handleEvent;
}
