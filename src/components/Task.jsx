import { useRef } from 'react';
import { motion } from 'motion/react';
import TrashButton from './TrashButton';
import EditTaskButton from './EditTaskButton';
import { HourGlassIcon } from '../assets/Icons';
import { formatDuration } from '../utils/formatTime';
import { formatDate } from '../utils/formatTime';

export default function Task({ task, removeTask, editTask, animationDelay }) {
   const priorityColors = [
      'text-priority-0',
      'text-priority-1',
      'text-priority-2',
      'text-priority-3',
   ];
   const taskRef = useRef(null);
   return (
      <motion.div
         initial={{ opacity: 0, translate: '-30%' }}
         animate={{ opacity: 1, translate: '0' }}
         transition={{ delay: animationDelay }}
      >
         <div
            ref={taskRef}
            className="task bg-primary-800 border-primary-600 flex items-center gap-2 border px-4 py-2"
         >
            <button
               type="button"
               className={`h-5 w-5 border-2 bg-current/10 ${priorityColors[task.priority]}`}
               onClick={() => {
                  taskRef.current.classList.add('exit-animation');
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
               <EditTaskButton editTask={editTask} task={task} />
               <TrashButton
                  remove={() => removeTask(task.id)}
                  altText={`task ${task.name}`}
               />
            </div>
         </div>
      </motion.div>
   );
}
