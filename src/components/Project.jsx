import { useEffect } from 'react';
import useTasks from '../hooks/useTasks';

import generateId from '../utils/generateId';
import { formatDuration } from '../utils/formatTime';
import getTasks from '../utils/getTasks';

import Task from './Task';
import ButtonAddTask from './ButtonAddTask';
import ProjectHeader from './ProjectHeader';

export default function Project({ editProject, project }) {
   const [tasks, setTasks, addTask, removeTask, editTask] = useTasks(
      project.id
   );

   // if project changes, load different tasks
   useEffect(() => {
      setTasks(getTasks(project.id));
   }, [project, setTasks]);

   return (
      <div className="oveflow-y-hidden grid h-svh content-start items-start">
         <ProjectHeader
            project={project}
            editProject={editProject}
            tasksDuration={formatDuration(
               tasks.reduce((sum, task) => task.duration + sum)
            )}
         />

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
