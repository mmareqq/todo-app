import { useState } from 'react';

const useToggle = (initialState: boolean) => {
   const [state, setState] = useState(initialState);

   const toggle = () => setState(p => !p);
   return [state, toggle] as const;
};

export default useToggle;
