import { useState } from 'react';

const useDragState = () => {
   const [dragging, setDragging] = useState(false);

   const stopDrag = () => setDragging(false);
   const startDrag = () => setDragging(true);

   return [dragging, stopDrag, startDrag] as const;
};
export default useDragState;
