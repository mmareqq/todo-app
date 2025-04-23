import { useState, useCallback, useRef } from 'react';

function useLiveState(val) {
   const ref = useRef(val);
   const [, setValue] = useState(ref.current);

   const getValue = () => ref.current;
   const updateValue = useCallback(newValue => {
      setValue(newValue);
      ref.current = newValue;
   }, []);

   return [getValue, updateValue];
}

export default useLiveState;
