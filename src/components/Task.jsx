import TrashButton from './TrashButton';
import EditButton from './EditButton';
import { StopWatchIcon } from '../assets/Icons';
import { formatDuration } from '../utils/formatTime';

export default function Task({ task, removeTask, editTask }) {
   const priorityColors = [
      'text-priority-0',
      'text-priority-1',
      'text-priority-2',
      'text-priority-3',
   ];
   console.log(task);
   return (
      <div
         className={`bg-primary-800 task border-primary-600 flex items-center gap-2 border px-4 py-2`}
      >
         <button
            type="button"
            className={`h-5 w-5 border-2 bg-current/10 ${priorityColors[task.priority]}`}
            onClick={() => removeTask(task.id)}
         >
            <span className="sr-only">complete task</span>
         </button>
         <p>{task.name}</p>
         <div className="flex gap-1" hidden={!task.duration}>
            <StopWatchIcon /> {formatDuration(task.duration)}
         </div>
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
