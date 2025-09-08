import AnimateSlideIn from '@ui/AnimateSlideIn';

import { formatDate, formatDuration } from '@frontend/utils/time';

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
            <button
               type="button"
               className={`h-5 w-5 border-2 bg-current/10 ${priorityColors[task.priority]}`}
               onClick={e => {
                  e.currentTarget
                     .closest('[data-type="task"]')
                     ?.classList.add('exit-animation');
                  setTimeout(() => removeTask(task.id), 800);
               }}
            >
               <span className="sr-only">complete task</span>
            </button>

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
                  <EditTaskButton />
                  <EditTaskDialog editTask={editTask} task={task} />
               </DialogProvider>

               <DeleteButton iconSize={20} onRemove={() => removeTask(task.id)}>
                  {task.name || task.id}
               </DeleteButton>
            </div>
         </div>
      </AnimateSlideIn>
   );
};

export default Task;
