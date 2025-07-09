import { useCallback, useState } from 'react';
import type { UpdateValue } from '@data/helperTypes';

const useForm = <T extends object>(template: T) => {
   const [data, setData] = useState(template);

   const resetForm = useCallback(() => setData({ ...template }), [template]);

   const updateValue: UpdateValue<T> = useCallback((key, value) => {
      setData((prevData) => ({ ...prevData, [key]: value }));
   }, []);
   return [data, updateValue, resetForm] as const;
};

export default useForm;
