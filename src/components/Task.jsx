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
         className={`bg-primary-800 task border-primary-600 flex items-center border px-4 py-2`}
      >
         <button
            type="button"
            className={`h-5 w-5 border-2 bg-current/10 ${priorityColors[task.priority]}`}
            onClick={() => removeTask(task.id)}
         >
            <span className="sr-only">complete task</span>
         </button>
         <p className="pl-3">{task.name}</p>
         <div className="ml-auto flex items-center">
            <EditButton editTask={editTask} task={task} />
            <TrashButton
               remove={() => removeTask(task.id)}
               altText={`task ${task.name}`}
            />
         </div>
      </div>
   );
}
