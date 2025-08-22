import { useRef } from 'react';
import AnimateSlideIn from '@ui/AnimateSlideIn';

import { formatDate, formatDuration } from '@utils/time';

import { HourGlassIcon } from '@assets/Icons';
import DeleteButton from '@ui/DeleteButton';
import EditTaskButton from './EditTaskButton';

import DialogProvider from '@contexts/DialogProvider';
import EditTaskDialog from './EditTaskDialog';

import { priorityColors } from '@data/data';

import type { Task } from '@data/types';

type Props = {
   task: Task;
   editTask: (newTask: Task) => void;
   removeTask: (id: Task['id']) => void;
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

            {task.date && <div>{formatDate(task.date)}</div>}

            <div className="ml-auto flex items-center">
               <div
                  className="mr-4 flex items-center gap-1"
                  hidden={!task.duration}
               >
                  <HourGlassIcon width={12} />
                  {formatDuration(task.duration)}
               </div>

               <DialogProvider>
                  <EditTaskButton />
                  <EditTaskDialog editTask={editTask} task={task} />
               </DialogProvider>

               <DeleteButton onRemove={() => removeTask(task.id)}>
                  {task.name || task.id}
               </DeleteButton>
            </div>
         </div>
      </AnimateSlideIn>
   );
};

export default Task;
