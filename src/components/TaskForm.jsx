import { PriorityIcon } from '../assets/Icons';
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
                  defaultValue={task.name}
                  onChange={e => {
                     updateValue('name', e.target.value);
                  }}
               />
            </label>
         </div>

         <div className="grid gap-2">
            <p>Priority:</p>
            <div className="flex place-content-center gap-4">
               {Array.from({ length: 4 }).map((_, i) => {
                  return (
                     <label
                        key={i}
                        className={`priority-input transition-color cursor-pointer border-1 p-4 duration-250 hover:ring ${priorityColors[i]} ${task.priority === i ? 'bg-current/10' : ''}`}
                     >
                        <input
                           className="mr-2"
                           type="radio"
                           name="taskPriority"
                           onChange={() => updateValue('priority', i)}
                           checked={task.priority === i}
                           hidden
                        />
                        <PriorityIcon className="h-full w-full" />
                        <div className="sr-only">Priority {i}</div>
                     </label>
                  );
               })}
            </div>
         </div>
      </div>
   );
}
