import { useState, useEffect } from 'react';
import Task from './Task';
import ButtonAddTask from './ButtonAddTask';
import { motion, AnimatePresence } from 'motion/react';
import { formatDuration } from '../utils/formatTime';
import { StopWatchIcon } from '../assets/Icons';

function getTasks(projectId) {
   const tasks = localStorage.getItem(`tasks-${projectId}`);
   return JSON.parse(tasks) || [];
}

export default function Project({ project }) {
   const [tasks, setTasks] = useState(() => getTasks(project.id));

   useEffect(() => {
      setTasks(getTasks(project.id));
   }, [project]);

   useEffect(() => {
      localStorage.setItem(`tasks-${project.id}`, JSON.stringify(tasks));
   }, [tasks]);

   const addTask = newTask => {
      setTasks(prevTasks => [...prevTasks, newTask]);
   };

   const removeTask = taskIdToDelete => {
      setTasks(prevTasks =>
         prevTasks.filter(task => task.id != taskIdToDelete)
      );
   };

   const editTask = editedTask => {
      setTasks(prevTasks => {
         return prevTasks.map(task =>
            task.id === editedTask.id ? editedTask : task
         );
      });
   };

   return (
      <div>
         <div>
            <h2 className="pt-4 text-2xl">{project.name}</h2>
            <div className="my-6 flex items-center gap-1 text-sm">
               <StopWatchIcon />
               <span>
                  Total Duration:&nbsp;
                  {formatDuration(
                     tasks.reduce((sum, task) => task.duration + sum, 0)
                  )}
               </span>
            </div>
         </div>
         <div className="grid gap-4">
            <AnimatePresence>
               {tasks.length > 0 &&
                  tasks.map(task => {
                     return (
                        <motion.div
                           key={task.id}
                           initial={{ opacity: 0, transform: 'rotateX(90deg)' }}
                           animate={{ opacity: 1, transform: 'rotateX(0deg)' }}
                           exit={{ opacity: 0, transform: 'rotateX(90deg)' }}
                        >
                           <Task
                              task={task}
                              editTask={editTask}
                              removeTask={removeTask}
                           ></Task>
                        </motion.div>
                     );
                  })}
            </AnimatePresence>
         </div>
         <div className="mt-4 flex justify-end">
            <ButtonAddTask addTask={addTask} />
         </div>
      </div>
   );
}
