import Button from '@ui/Button';
import { formatDuration } from '@utils/formatTime';
import { twMerge } from 'tailwind-merge';
import type { UpdateValue } from '@data/helperTypes';
import type { TaskPayload } from '@data/types';

type DurationBtnProps = {
   val: number;
   removeValue: (val: number) => void;
   isEditing: boolean;
   duration: number;
   updateValue: UpdateValue<TaskPayload>;
};

const DurationButton = ({
   val,
   removeValue,
   isEditing,
   duration,
   updateValue,
}: DurationBtnProps) => {
   const isActive = duration === val;
   const isDeletable = val !== 0;

   const onClick = () => updateValue('duration', val);
   const onRemove = () => {
      removeValue(val);
      if (isActive) updateValue('duration', 0);
   };

   const styleDefault =
      'hover:bg-primary-700/50 border border-primary-700 px-2';
   const styleActive = twMerge(
      styleDefault,
      'bg-accent-900/10 shadow shadow-accent-950/50 border-accent-900 pointer-events-none',
   );

   return (
      <li className="group relative">
         <Button
            variant="square"
            className={isActive ? styleActive : styleDefault}
            onClick={onClick}
         >
            {formatDuration(val) || 'None'}
         </Button>

         {isDeletable && isEditing && (
            <Button
               variant="square"
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
