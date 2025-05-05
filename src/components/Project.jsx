import { useMemo } from 'react';
import useTasks from '../hooks/useTasks';

import generateId from '../utils/generateId';
import { formatDuration } from '../utils/formatTime';
import sortTasks from '../utils/sortTasks';

import Task from './Task';
import ButtonAddTask from './ButtonAddTask';
import ProjectHeader from './ProjectHeader';

export default function Project({
   editProject,
   project,
   sortMethod,
   updateSettings,
}) {
   const [tasks, addTask, removeTask, editTask] = useTasks(project.id);
   const sortedTasks = useMemo(
      () => sortTasks(tasks, sortMethod),
      [tasks, sortMethod]
   );

   return (
      <div className="oveflow-y-hidden grid h-svh content-start items-start">
         <ProjectHeader
            project={project}
            editProject={editProject}
            sortMethod={sortMethod}
            updateSettings={updateSettings}
            tasksDuration={formatDuration(
               tasks.reduce((sum, task) => task.duration + sum, 0)
            )}
         />

         <div className="max-h-full overflow-y-auto">
            <div className="grid gap-4 overflow-x-hidden pr-1">
               {sortedTasks.map((task, i) => {
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
               {/* TO BE DELETED */}
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
