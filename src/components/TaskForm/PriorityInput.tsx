import { PriorityIcon } from '@assets/Icons';
import { priorityColors } from '@data/data';

import type { UpdateValue } from '@data/helperTypes';
import type { TaskPayload } from '@data/types';

type Props = {
   priority: number;
   updateValue: UpdateValue<TaskPayload>;
};

const PriorityInput = ({ priority, updateValue }: Props) => {
   const priorities = [0, 1, 2, 3];
   return (
      <div className="grid gap-2">
         <div className="mb-1">Priority</div>
         <div className="flex justify-between">
            {priorities.map(i => {
               const isActive = priority === i;
               return (
                  <label
                     key={i}
                     className={`priority-input transition-color cursor-pointer border-1 p-4 duration-250 hover:ring ${priorityColors[i]} ${isActive && 'bg-current/10'}`}
                  >
                     <input
                        type="radio"
                        className="sr-only"
                        name="taskPriority"
                        checked={isActive}
                        onChange={() => updateValue('priority', i)}
                     />
                     <PriorityIcon className="h-full w-full" />
                     <div className="sr-only">Priority {i}</div>
                  </label>
               );
            })}
         </div>
      </div>
   );
};

export default PriorityInput;
