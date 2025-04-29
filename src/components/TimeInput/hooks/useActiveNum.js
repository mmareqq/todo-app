import { useState, useCallback } from 'react';
import debounce from '../utils/debounce';
import getNearestMultiple from '../utils/getNearestMultiple';

export default function useActiveNum(config, updateInput) {
   const [activeNum, setActiveNum] = useState(0);

   const updateActiveNum = useCallback(
      offset => {
         const num = calculateActiveNum(
            offset,
            config.numHeight,
            config.numCount
         );

         updateInput(num);
         setActiveNum(num);
      },
      [config, updateInput]
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

function calculateActiveNum(offset, numHeight, numCount) {
   const roundedOffset = getNearestMultiple(offset, numHeight);
   const index = Math.abs(roundedOffset) / numHeight + 1;
   return index % numCount;
}
