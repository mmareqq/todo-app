import { PriorityIcon } from '@assets/Icons';
import { priorityColors } from '@data/data';

import type { UpdateValue } from '@data/helperTypes';
import type { TaskPayload, TaskPriority } from '@data/types';

type Props = {
   priority: TaskPriority;
   updateValue: UpdateValue<TaskPayload>;
};

const PriorityInput = ({ priority, updateValue }: Props) => {
   const priorities: TaskPriority[] = ['none', 'low', 'medium', 'high'];
   return (
      <div className="grid gap-2">
         <div className="mb-1">Priority</div>
         <div className="flex justify-between">
            {priorities.map(inputPriority => {
               const isActive = priority === inputPriority;
               return (
                  <label
                     key={inputPriority}
                     className={`priority-input transition-color cursor-pointer border-1 p-4 duration-250 hover:ring ${priorityColors[inputPriority]} ${isActive && 'bg-current/10'}`}
                  >
                     <input
                        type="radio"
                        className="sr-only"
                        name="taskPriority"
                        checked={isActive}
                        onChange={() => updateValue('priority', inputPriority)}
                     />
                     <PriorityIcon className="h-full w-full" />
                     <div className="sr-only">Priority {inputPriority}</div>
                  </label>
               );
            })}
         </div>
      </div>
   );
};

export default PriorityInput;
