import { useCallback, useState } from 'react';
import type { UpdateValue } from '@frontend/data/helperTypes';

const useForm = <T extends object>(template: T) => {
   const [data, setData] = useState(template);

   const resetForm = useCallback(
      (newData?: T) => setData(newData ? { ...newData } : { ...template }),
      [template],
   );
   const updateValue: UpdateValue<T> = useCallback((key, value) => {
      setData(prevData => ({ ...prevData, [key]: value }));
   }, []);
   return { data, updateValue, resetForm };
};

export default useForm;
