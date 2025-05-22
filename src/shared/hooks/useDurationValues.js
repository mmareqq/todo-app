import { durationValues } from '@data/data';
import { useState, useEffect } from 'react';

function getInititalValues() {
   const values = localStorage.getItem('durationValues');
   console.log(values);
   return values ? JSON.parse(values) : durationValues;
}

const useDurationValues = () => {
   const [values, setValues] = useState(getInititalValues);

   const addValue = value =>
      setValues(prevValues => {
         if (prevValues.find(curr => curr === value)) {
            return prevValues;
         }

         return [...prevValues, value].sort((a, b) => a - b);
      });

   useEffect(() => {
      localStorage.setItem('durationValues', JSON.stringify(values));
   }, [values]);

   const removeValue = value =>
      setValues(prevValues =>
         prevValues.filter(currValue => currValue !== value),
      );

   return [values, addValue, removeValue];
};

export default useDurationValues;
