import { useState, useEffect } from 'react';
import Task from './Task';
import ButtonAddTask from './ButtonAddTask';
import { formatDuration } from '../utils/formatTime';
import { HourGlassIcon } from '../assets/Icons';
import generateId from '../utils/generateId';

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
      <div className="oveflow-y-hidden grid h-svh content-start items-start">
         <div>
            <h2 className="pt-4 text-2xl">{project.name}</h2>
            <div className="my-6 flex items-center gap-1 text-sm">
               <HourGlassIcon />
               <span>
                  Total Duration:&nbsp;
                  {formatDuration(
                     tasks.reduce((sum, task) => task.duration + sum, 0)
                  )}
               </span>
            </div>
         </div>

         <div className="max-h-full overflow-y-auto">
            <div className="grid gap-4 overflow-x-hidden pr-1">
               {tasks.map((task, i) => {
                  return (
                     <Task
                        key={task.id}
                        task={task}
                        editTask={editTask}
                        removeTask={removeTask}
                        animationDelay={i * 0.05}
                     />
                  );
               })}
            </div>
            <div className="mt-4 flex justify-end gap-4">
               <button
                  className="rounded-sm border-1 border-yellow-700 px-4 py-1"
                  type="button"
                  onClick={() => {
                     const tasks = [
                        {
                           id: generateId(),
                           finished: false,
                           name: 'Task 1',
                           priority: 2,
                           duration: 15,
                        },
                        {
                           id: generateId(),
                           finished: false,
                           name: 'Task 2',
                           priority: 0,
                           duration: 90,
                        },
                        {
                           id: generateId(),
                           finished: false,
                           name: 'Task 3',
                           priority: 1,
                           duration: 45,
                        },
                        {
                           id: generateId(),
                           finished: false,
                           name: 'Task 4',
                           priority: 2,
                           duration: 15,
                        },
                        {
                           id: generateId(),
                           finished: false,
                           name: 'Task 5',
                           priority: 3,
                           duration: 5,
                        },
                     ];
                     tasks.forEach(task => addTask(task));
                  }}
               >
                  Load 5 tasks
               </button>
               <ButtonAddTask addTask={addTask} />
            </div>
         </div>
      </div>
   );
}
