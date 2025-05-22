import { PriorityIcon } from '@assets/Icons';
import { priorityColors } from '@data/data';

import useDurationValues from '@hooks/useDurationValues';
import Button from '@ui/Button';

function TaskForm({ task, updateValue }) {
   const [durationValues, addDurationValue, removeDurationValue] =
      useDurationValues();

   const btnActive = 'bg-primary-700 border-primary-100';
   return (
      <div className="mb-6 grid gap-4">
         <div>
            <label htmlFor="taskName">Name</label>
            <input
               className="ml-2 border"
               type="text"
               id="taskName"
               name="taskName"
               value={task.name}
               onChange={e => updateValue('name', e.target.value)}
            />
         </div>

         <div className="grid gap-2">
            <div className="mb-1">Priority</div>
            <div className="flex justify-between">
               {[0, 1, 2, 3].map(i => {
                  return (
                     <label
                        key={i}
                        className={`priority-input transition-color cursor-pointer border-1 p-4 duration-250 hover:ring ${priorityColors[i]} ${task.priority === i ? 'bg-current/10' : ''}`}
                     >
                        <input
                           className="sr-only"
                           type="radio"
                           name="taskPriority"
                           onChange={() => updateValue('priority', i)}
                           checked={task.priority === i}
                        />
                        <PriorityIcon className="h-full w-full" />
                        <div className="sr-only">Priority {i}</div>
                     </label>
                  );
               })}
            </div>
         </div>
         <div>
            <div className="mb-4">Duration:</div>
            <ul className="flex gap-2">
               {durationValues.map(val => {
                  return (
                     <li key={val} className="group relative">
                        <Button
                           variant="none"
                           className={`border-primary-700 rounded-sm border px-2 py-1 ${task.duration === val ? btnActive : ''}`}
                           onClick={() => updateValue('duration', val)}
                        >
                           {val}
                        </Button>
                        <Button
                           variant="none"
                           className="group-hover:bg-primary-700 right invisible absolute z-10 rounded-xs px-1 text-xs group-hover:visible"
                           onClick={() => removeDurationValue(val)}
                        >
                           X
                        </Button>
                     </li>
                  );
               })}
            </ul>
         </div>
         <div className="flex gap-5">
            <span>Date:</span>
            <input
               type="date"
               id="task-date"
               name="task-date"
               value={task.date}
               onChange={e => updateValue('date', e.target.value)}
            />
         </div>
      </div>
   );
}

export default TaskForm;
