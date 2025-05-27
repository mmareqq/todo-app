import { useCallback, useState } from 'react';

export default function useForm<T extends object>(template: T) {
   const [data, setData] = useState(template);

   const resetForm = useCallback(() => setData({ ...template }), [template]);

   const updateValue = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
      setData((prevData) => ({ ...prevData, [key]: value }));
   }, []);
   return [data, updateValue, resetForm] as const;
}
