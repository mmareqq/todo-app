import { useState, useCallback } from 'react';
import debounce from '../utils/debounce';
import getNearestMultiple from '../utils/getNearestMultiple';

export default function useActiveNum(numHeight, numOfElements) {
   const [activeNum, setActiveNum] = useState(0);

   const updateActiveNum = useCallback(
      offset => {
         const num = calculateActiveNum(offset, numHeight, numOfElements);
         setActiveNum(num);
      },
      [numHeight, numOfElements]
   );

   // eslint-disable-next-line
   const updateActiveNumDebounce = useCallback(
      debounce(offset => {
         updateActiveNum(offset);
      }, 80),
      [updateActiveNum]
   );

   return [activeNum, updateActiveNum, updateActiveNumDebounce];
}

function calculateActiveNum(offset, numHeight, numOfElements) {
   const roundedOffset = getNearestMultiple(offset, numHeight);
   const index = Math.abs(roundedOffset) / numHeight + 1;
   return index % numOfElements;
}
