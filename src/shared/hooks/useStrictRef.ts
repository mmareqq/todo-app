import { useRef } from 'react';

export default function useStrictRef<T>() {
   const ref = useRef<T | null>(null);
   const getRef = () => {
      if (!ref.current) throw new Error('ref is null in strict hook');
      return ref.current;
   };

   return [ref, getRef] as const;
}
