import { useState } from 'react';

import { PlusIcon, CheckMarkIcon, EditIcon } from '@assets/Icons';
import Button from '@ui/Button';

type DurationPanelProps = {
   values: number[];
   addValue: (val: number) => void;
   isEditing: boolean;
   toggleIsEditing: () => void;
};

const EditPanel = ({
   values,
   addValue,
   isEditing,
   toggleIsEditing,
}: DurationPanelProps) => {
   const [inputVal, setInputVal] = useState('');

   const handleAddValue = () => {
      if (!inputVal) return;
      setInputVal('');
      const val = Number(inputVal);

      if (values.some(v => v === val)) return; // if already in the arr
      addValue(val);
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val.length > 3) return;
      if (val.length === 0 || /^\d+$/.test(val)) setInputVal(val); // only numbers
   };

   return (
      <div className="flex">
         {isEditing && (
            <div className="flex items-center gap-1">
               <input
                  type="text"
                  className="placeholder-shown:text-primary-400 text-primary-200 w-12 rounded-sm border border-current py-0.5 pl-2 text-sm focus:outline-none"
                  value={inputVal}
                  placeholder="0"
                  onChange={handleInputChange}
               />
               <Button variant="icon" onClick={handleAddValue}>
                  <PlusIcon size={18} />
               </Button>
            </div>
         )}

         <Button variant="icon" onClick={toggleIsEditing}>
            {isEditing ? <CheckMarkIcon /> : <EditIcon />}
         </Button>
      </div>
   );
};

export default EditPanel;
