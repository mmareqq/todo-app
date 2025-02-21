import { useCallback, useState } from 'react';

export default function useForm(template) {
   const [data, setData] = useState(template);

   const clearForm = useCallback(() => setData(template), [template]);

   const updateValue = useCallback(
      (name, value) =>
         setData(prevData => {
            return { ...prevData, [name]: value };
         }),
      []
   );
   return [data, updateValue, clearForm];
}
