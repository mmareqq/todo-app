import { useState } from 'react';
import { PriorityIcon } from '../assets/Icons';
import { formatDuration } from '../utils/formatTime';

export default function TaskForm({ task, updateValue }) {
   const priorityColors = [
      'text-priority-0',
      'text-priority-1',
      'text-priority-2',
      'text-priority-3',
   ];
   const [isDuration, setIsDuration] = useState(task.duration !== 0);

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
            <div className="mb-1">
               <input
                  type="checkbox"
                  onChange={() => updateValue('duration', 0)}
               />
               Duration
            </div>
            {task.duration && (
               <div className="flex flex-wrap gap-2">
                  {[5, 10, 15, 30, 45, 60, 90, 120].map(duration => {
                     return (
                        <label
                           key={duration}
                           className={`${duration === task.duration ? 'bg-primary-400/15' : ''} cursor-pointer border-1 px-2 py-1`}
                        >
                           {duration ? formatDuration(duration) : 'none'}
                           <input
                              className="sr-only"
                              type="radio"
                              name="taskDuration"
                              onChange={() => updateValue('duration', duration)}
                           />
                        </label>
                     );
                  })}
               </div>
            )}
         </div>
      </div>
   );
}
