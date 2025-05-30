import { durationValues } from '@data/data';
import { useState, useEffect } from 'react';

function getInititalValues() {
   const values = localStorage.getItem('durationValues');
   return values ? JSON.parse(values) : durationValues;
}

const useDurationValues = () => {
   const [values, setValues] = useState<number[]>(getInititalValues);

   useEffect(() => {
      localStorage.setItem('durationValues', JSON.stringify(values));
   }, [values]);

   const addValue = (value: number) => {
      setValues((prevValues) => [...prevValues, value].sort((a, b) => a - b));
   };

   const removeValue = (value: number) =>
      setValues((prevValues) =>
         prevValues.filter((currValue) => currValue !== value),
      );

   return [values, addValue, removeValue] as const;
};

export default useDurationValues;
