import { formatDisplayDate, formatDuration } from '@frontend/utils/time';
import Button from '@ui/Button';
import DeleteButton from '@ui/DeleteButton';
import EditTask from './EditTask';
import { priorityColors } from '@frontend/data/data';
import type { Task as TaskType } from '@frontend/data/types';
import useRemoveTaskMutation from './api/useRemoveTaskMutation';

type Props = {
   task: TaskType;

   includeDate?: boolean;
};

const Task = ({ task, includeDate = false }: Props) => {
   const { mutate: removeTask } = useRemoveTaskMutation();

   return (
      <div
         data-type="task"
         className="task bg-primary-700/30 border-primary-600 flex items-center gap-2 border px-4 py-2 backdrop-blur-lg"
      >
         <Button
            variant="none"
            className={`h-5 w-5 border-2 bg-current/10 ${priorityColors[task.priority]}`}
            onClick={e => {
               e.currentTarget
                  .closest('[data-type="task"]')
                  ?.classList.add('exit-animation');
               setTimeout(removeTask, 800);
            }}
            aria-label={`complete ${task.name} task`}
         />

         <div>{task.name}</div>
         {includeDate && task.dueDate && (
            <div className="text-current/70">
               {formatDisplayDate(task.dueDate, 'short')}
            </div>
         )}

         <div className="ml-auto flex items-center gap-1">
            <div
               className="mr-2 flex items-center gap-1 text-current/70"
               hidden={!task.duration}
            >
               {formatDuration(task.duration)}
            </div>

            <EditTask task={task} />

            <DeleteButton
               label={task.name}
               onRemove={() => removeTask(task.id)}
               iconSize={20}
            />
         </div>
      </div>
   );
};

export default Task;
