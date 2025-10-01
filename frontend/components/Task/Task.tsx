import AnimateSlideIn from '@ui/AnimateSlideIn';
import { formatDisplayDate, formatDuration } from '@frontend/utils/time';
import Button from '@ui/Button';
import DeleteButton from '@ui/DeleteButton';
import EditTask from './EditTask';
import { priorityColors } from '@frontend/data/data';

import type { Task as TaskType } from '@frontend/data/types';
import useRemoveTaskMutation from './useRemoveTaskMutation';

type Props = {
   task: TaskType;
   animationDelay: number;
};

const Task = ({ task, animationDelay }: Props) => {
   const { mutate: removeTask } = useRemoveTaskMutation(task.id);
   return (
      <AnimateSlideIn delayMS={animationDelay}>
         <div
            data-type="task"
            className="task bg-primary-800 border-primary-600 flex items-center gap-2 border px-4 py-2"
         >
            <Button
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

            {task.dueDate && (
               <div className="text-current/70">
                  {formatDisplayDate(task.dueDate.toISOString())}
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
                  onRemove={removeTask}
                  iconSize={20}
               />
            </div>
         </div>
      </AnimateSlideIn>
   );
};

export default Task;
