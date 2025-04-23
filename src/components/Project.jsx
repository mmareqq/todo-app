import { useState, useEffect } from 'react';
import generateId from '../utils/generateId';
import { formatDuration } from '../utils/formatTime';
import { HourGlassIcon } from '../assets/Icons';

import Task from './Task';
import ButtonAddTask from './ButtonAddTask';
import EditProjectButton from './EditProjectButton';

import useTasks from '../hooks/useTasks';
import getTasks from '../utils/getTasks';

export default function Project({ editProject, project }) {
   const [tasks, setTasks, addTask, removeTask, editTask] = useTasks(
      project.id
   );

   useEffect(() => {
      setTasks(getTasks(project.id));
   }, [project]);

   return (
      <div className="oveflow-y-hidden grid h-svh content-start items-start">
         <div>
            <div className="border-primary-500 flex items-end justify-between border-b-1 py-2">
               <h2 className="pt-4 text-2xl">{project.name}</h2>
               <EditProjectButton
                  editProject={editProject}
                  project={project}
               ></EditProjectButton>
            </div>
            <div className="my-6 flex items-center gap-1 text-sm">
               <div>
                  <HourGlassIcon></HourGlassIcon>
               </div>
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
