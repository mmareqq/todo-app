import { useEffect } from 'react';
const useLogger = (value: unknown) => {
   useEffect(() => {
      console.log('val change ', value);
   }, [value]);
};

export default useLogger;
