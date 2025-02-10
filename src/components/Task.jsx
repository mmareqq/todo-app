import { useState } from 'react';
export default function Task({ task }) {
   const priorityColors = {
      0: 'bg-gray-400',
      1: 'bg-blue-400',
      2: 'bg-yellow-400',
      3: 'bg-red-400',
   };
   const [finished, setFinished] = useState(task.finished);
   return (
      <div
         className={`task flex items-center gap-2 border-2 border-solid border-black ${finished ? 'line-through' : ''}`}
      >
         <h3>{task.name}</h3>
         <button
            type="button"
            className={`h-4 w-4 ${priorityColors[task.priority]}`}
            onClick={() => {
               setFinished(!finished);
            }}
         >
            <span className="sr-only">complete task</span>
         </button>
      </div>
   );
}
