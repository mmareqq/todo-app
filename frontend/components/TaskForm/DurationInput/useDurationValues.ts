import { durationValues } from '@frontend/data/data';
import { useState, useEffect } from 'react';

const getInititalValues = () => {
   const values = localStorage.getItem('durationValues');
   return (values ? JSON.parse(values) : durationValues) as number[];
};

const useDurationValues = () => {
   const [values, setValues] = useState(getInititalValues);

   useEffect(() => {
      localStorage.setItem('durationValues', JSON.stringify(values));
   }, [values]);

   const addValue = (value: number) => {
      setValues(prevValues => [...prevValues, value].sort((a, b) => a - b));
   };

   const removeValue = (value: number) =>
      setValues(prevValues =>
         prevValues.filter(currValue => currValue !== value),
      );

   return { values, addValue, removeValue };
};

export default useDurationValues;
