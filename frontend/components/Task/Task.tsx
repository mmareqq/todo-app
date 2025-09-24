import AnimateSlideIn from '@ui/AnimateSlideIn';

import { formatDate, formatDuration } from '@frontend/utils/time';

import Button from '@ui/Button';
import DeleteButton from '@ui/DeleteButton';
import EditTaskButton from './EditTaskButton';

import DialogProvider from '@contexts/DialogProvider';
import EditTaskDialog from './EditTaskDialog';

import { priorityColors } from '@frontend/data/data';

import type { Task as TaskType, TaskActions } from '@frontend/data/types';

type Props = {
   task: TaskType;
   editTask: TaskActions['editTask'];
   removeTask: TaskActions['removeTask'];
   animationDelay: number;
};

const Task = ({ task, editTask, removeTask, animationDelay }: Props) => {
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
                  setTimeout(() => removeTask(task.id), 800);
               }}
               aria-label={`complete ${task.name} task`}
            />

            <div>{task.name}</div>

            {task.dueDate && (
               <div className="text-current/70">{formatDate(task.dueDate)}</div>
            )}

            <div className="ml-auto flex items-center gap-1">
               <div
                  className="mr-2 flex items-center gap-1 text-current/70"
                  hidden={!task.duration}
               >
                  {formatDuration(task.duration)}
               </div>

               <DialogProvider>
                  <EditTaskButton label={task.name} />
                  <EditTaskDialog editTask={editTask} task={task} />
               </DialogProvider>

               <DeleteButton
                  label={task.name}
                  onRemove={() => removeTask(task.id)}
                  iconSize={20}
               />
            </div>
         </div>
      </AnimateSlideIn>
   );
};

export default Task;
