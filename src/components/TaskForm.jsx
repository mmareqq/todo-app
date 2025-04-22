import { PriorityIcon } from '../assets/Icons';

import TimeInput from './TimeInput/TimeInput';

export default function TaskForm({ task, updateValue }) {
   const priorityColors = [
      'text-priority-0',
      'text-priority-1',
      'text-priority-2',
      'text-priority-3',
   ];

   const durationHours = Math.floor(task.duration / 60);
   const durationMinutes = task.duration / 60;

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
            <div className="mb-1">Duration:</div>
            <div className="flex justify-center gap-4">
               <div className="flex items-center">
                  <TimeInput
                     fontSize={12}
                     numCount={24}
                     setInput={newHours => {
                        updateValue(
                           'duration',
                           newHours * 60 + durationMinutes
                        );
                     }}
                  ></TimeInput>
                  <div>h</div>
               </div>
               <div className="flex items-center">
                  <TimeInput
                     fontSize={12}
                     numCount={60}
                     setInput={newMinutes => {
                        updateValue('duration', durationHours + newMinutes);
                     }}
                  ></TimeInput>
                  <div>min</div>
               </div>
            </div>
         </div>
      </div>
   );
}
