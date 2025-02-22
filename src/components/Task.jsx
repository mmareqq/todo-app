import TrashButton from './TrashButton';
import EditButton from './EditButton';
export default function Task({ task, removeTask, editTask }) {
   const priorityColors = {
      0: 'bg-primary-0',
      1: 'bg-primary-1',
      2: 'bg-primary-2',
      3: 'bg-primary-3',
   };

   return (
      <div
         className={`task flex items-center gap-2 border-2 border-solid border-black ${task.finished ? 'line-through' : ''}`}
      >
         <h3>{task.name}</h3>
         <button
            type="button"
            className={`h-5 w-5 ${priorityColors[task.priority]}`}
            onClick={() => {
               editTask({ ...task, finished: !task.finished });
            }}
         >
            <span className="sr-only">complete task</span>
         </button>
         <EditButton></EditButton>
         <TrashButton
            remove={() => removeTask(task.id)}
            altText={`task ${task.name}`}
         ></TrashButton>
      </div>
   );
}
