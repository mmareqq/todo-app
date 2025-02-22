import { PriorityIcon } from '../assets/Icons';
export default function TaskForm({ task, updateValue }) {
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
                  onChange={e => {
                     updateValue('name', e.target.value);
                  }}
               />
            </label>
         </div>

         <div className="grid gap-2">
            <p>Priority:</p>
            <div className="flex gap-4">
               <label className="text-sm text-white/80">
                  <input
                     className="input-priority mr-2"
                     type="radio"
                     name="taskPriority"
                     onChange={() => updateValue('priority', 0)}
                     checked={task.priority === 0}
                  />
                  <PriorityIcon width="54" height="54"></PriorityIcon>
                  Priority 0
               </label>
               <label>
                  <input
                     className="mr-2"
                     type="radio"
                     name="taskPriority"
                     onChange={() => updateValue('priority', 1)}
                     checked={task.priority === 1}
                  />
                  Priority 1
               </label>
               <label>
                  <input
                     className="mr-2"
                     type="radio"
                     name="taskPriority"
                     onChange={() => updateValue('priority', 2)}
                     checked={task.priority === 2}
                  />
                  Priority 2
               </label>
               <label>
                  <input
                     className="mr-2"
                     type="radio"
                     name="taskPriority"
                     onChange={() => updateValue('priority', 3)}
                     checked={task.priority === 3}
                  />
                  Priority 3
               </label>
            </div>
         </div>
      </div>
   );
}
