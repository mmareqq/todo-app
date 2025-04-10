import TrashButton from './TrashButton';
import EditButton from './EditButton';
import { HourGlassIcon } from '../assets/Icons';
import { formatDuration } from '../utils/formatTime';
import { useRef } from 'react';
import { motion } from 'motion/react';
import { animateExit } from '../utils/animations';
import { playSound } from '../utils/audio';

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
                  playSound();
                  console.log('sound played');
                  animateExit(() => {
                     removeTask(task.id);
                  }, taskRef);
               }}
            >
               <span className="sr-only">complete task</span>
            </button>
            <p>{task.name}</p>
            <div className="ml-auto flex items-center">
               <div
                  className="mr-4 flex items-center gap-0.5"
                  hidden={!task.duration}
               >
                  <HourGlassIcon />
                  {formatDuration(task.duration)}
               </div>
               <EditButton editTask={editTask} task={task} />
               <TrashButton
                  remove={() => removeTask(task.id)}
                  altText={`task ${task.name}`}
               />
            </div>
         </div>
      </motion.div>
   );
}
