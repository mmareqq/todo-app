import Button from '@ui/Button';
import { formatDuration } from '@utils/time';

import type { UpdateValue } from '@data/helperTypes';
import type { TaskPayload } from '@data/types';

type DurationBtnProps = {
   val: number;
   removeValue: (val: number) => void;
   updateValue: UpdateValue<TaskPayload>;
   isEditing: boolean;
   duration: number;
};

const DurationButton = ({
   val,
   updateValue,
   removeValue,
   isEditing,
   duration,
}: DurationBtnProps) => {
   const isActive = duration === val;
   const isDeletable = val !== 0;

   const onClick = () => updateValue('duration', val);
   const onRemove = () => {
      removeValue(val);
      if (isActive) updateValue('duration', 0);
   };

   return (
      <li className="group relative">
         <Button variant="glass" active={isActive} onClick={onClick}>
            {formatDuration(val) || 'None'}
         </Button>

         {isDeletable && isEditing && (
            <Button
               variant="none"
               className="hover:bg-primary-700 right text-normal invisible absolute inset-0 rounded-xs transition-none group-hover:visible"
               onClick={onRemove}
            >
               X
            </Button>
         )}
      </li>
   );
};

export default DurationButton;
