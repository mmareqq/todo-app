import { useState, useEffect } from 'react';
import Task from './Task';
import ButtonAddTask from './ButtonAddTask';
import { motion, AnimatePresence } from 'motion/react';
import { formatDuration } from '../utils/formatTime';

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
         <div className="py-4">
            <h2 className="my-4 text-2xl">{project.name}</h2>
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
         <div className="mt-4 flex justify-end gap-5">
            Total Duration:{' '}
            {formatDuration(
               tasks.reduce((sum, task) => task.duration + sum, 0)
            )}
            <ButtonAddTask addTask={addTask} />
         </div>
      </div>
   );
}
