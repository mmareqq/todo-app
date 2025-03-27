import { PriorityIcon } from '../assets/Icons';
import { formatDuration } from '../utils/formatTime';

export default function TaskForm({ task, updateValue }) {
   const priorityColors = [
      'text-priority-0',
      'text-priority-1',
      'text-priority-2',
      'text-priority-3',
   ];

   return (
      <div className="mb-6 grid gap-4">
         <div>
            <label>
               Name:
               <input
                  className="ml-2 border"
                  type="text"
                  id="taskName"
                  name="taskName"
                  value={task.name}
                  onChange={e => updateValue('name', e.target.value)}
               />
            </label>
         </div>

         <div className="grid gap-2">
            <p>Priority:</p>
            <div className="flex place-content-center gap-4">
               {[0, 1, 2, 3].map(i => {
                  return (
                     <label
                        key={i}
                        className={`priority-input transition-color border-1 p-4 duration-250 hover:ring ${priorityColors[i]} ${task.priority === i ? 'bg-current/10' : ''}`}
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
            <p>Duration:</p>

            <div className="flex flex-wrap gap-2">
               {[0, 5, 10, 15, 30, 45, 60, 90, 120].map(duration => {
                  return (
                     <label
                        key={duration}
                        className={`${duration === task.duration ? 'bg-primary-400/15' : ''} border-1 px-2 py-1`}
                     >
                        {formatDuration(duration) || 'none'}
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
         </div>
      </div>
   );
}
