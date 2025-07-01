import { useCallback, useState, useEffect } from 'react';

const useForm = <T extends object>(template: T) => {
   const [data, setData] = useState(template);

   useEffect(() => {
      setData(template);
   }, [template]);

   const resetForm = useCallback(() => setData({ ...template }), [template]);

   const updateValue = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
      setData((prevData) => ({ ...prevData, [key]: value }));
   }, []);
   return [data, updateValue, resetForm] as const;
};

export default useForm;
