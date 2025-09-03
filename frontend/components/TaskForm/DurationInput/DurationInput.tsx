import useToggle from '@hooks/useToggle';
import useDurationValues from './useDurationValues';
import EditPanel from './EditPanel';
import DurationButton from './DurationButton';

import type { UpdateValue } from '@data/helperTypes';
import type { TaskPayload } from '@data/types';

type Props = {
   duration: number;
   updateValue: UpdateValue<TaskPayload>;
};

const DurationInput = ({ duration, updateValue }: Props) => {
   const { values, addValue, removeValue } = useDurationValues();
   const [isEditing, toggleIsEditing] = useToggle(false);

   return (
      <div>
         <div className="mb-2 flex justify-between">
            <div>Duration:</div>
            <EditPanel
               values={values}
               addValue={addValue}
               isEditing={isEditing}
               toggleIsEditing={toggleIsEditing}
            />
         </div>
         <ul className="flex flex-wrap items-center gap-2">
            {values.map(val => (
               <DurationButton
                  key={val}
                  val={val}
                  removeValue={removeValue}
                  isEditing={isEditing}
                  duration={duration}
                  updateValue={updateValue}
               />
            ))}
         </ul>
      </div>
   );
};

export default DurationInput;
