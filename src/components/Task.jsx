import TrashButton from './TrashButton';
import EditButton from './EditButton';

export default function Task({ task, removeTask, editTask }) {
   const priorityColors = [
      'text-priority-0',
      'text-priority-1',
      'text-priority-2',
      'text-priority-3',
   ];

   return (
      <div
         className={`task border-primary-600 gap flex items-center border ${task.finished ? 'line-through' : ''}`}
      >
         <h3>{task.name}</h3>
         <button
            type="button"
            className={`h-5 w-5 rounded-full border-3 bg-current/20 ${priorityColors[task.priority]}`}
            onClick={() => {
               editTask({ ...task, finished: !task.finished });
            }}
         >
            <span className="sr-only">complete task</span>
         </button>
         <EditButton editTask={editTask} task={task} />
         <TrashButton
            remove={() => removeTask(task.id)}
            altText={`task ${task.name}`}
         />
      </div>
   );
}
