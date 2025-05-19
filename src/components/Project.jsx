import { useMemo, createContext, useContext } from 'react';
import useTasks from '../hooks/useTasks';
import { HourGlassIcon } from '../assets/Icons';

import generateId from '../utils/generateId';
import { formatDuration } from '../utils/formatTime';
import sortTasks from '../utils/sortTasks';

import Task from './Task';
import EditProjectButton from './EditProjectButton';
import ProjectSortMenu from './ProjectSortMenu';
import ButtonAddTask from './ButtonAddTask';

const ProjectContext = createContext();

function Project({ project, sortMethod, children }) {
   const [tasks, addTask, removeTask, editTask] = useTasks(project.id);
   const sortedTasks = useMemo(
      () => sortTasks(tasks, sortMethod),
      [tasks, sortMethod],
   );

   const totalDuration = tasks.reduce((acc, task) => task.duration + acc, 0);

   return (
      <div className="oveflow-y-hidden grid h-svh content-start items-start">
         <ProjectContext.Provider
            value={{
               project,
               sortMethod,
               addTask,
               totalDuration,
               removeTask,
               editTask,
               sortedTasks,
            }}
         >
            {children}
         </ProjectContext.Provider>
      </div>
   );
}

function Title({ editProject }) {
   const { project } = useContext(ProjectContext);
   return (
      <div className="border-primary-500 flex items-end justify-between border-b-1 py-2">
         <h2 className="pt-4 text-2xl">{project.name}</h2>
         {project.editable && (
            <EditProjectButton editProject={editProject} project={project} />
         )}
      </div>
   );
}

function InfoPanel({ updateSettings }) {
   const { totalDuration, sortMethod } = useContext(ProjectContext);
   return (
      <div className="flex items-center justify-between">
         <div className="my-6 flex items-center gap-1 text-sm">
            <HourGlassIcon />

            <div>Total Duration: {formatDuration(totalDuration)}</div>
         </div>
         <ProjectSortMenu
            updateSettings={updateSettings}
            sortMethod={sortMethod}
         />
      </div>
   );
}

function Body() {
   const { sortedTasks, editTask, removeTask } = useContext(ProjectContext);
   return (
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
      </div>
   );
}

function Menu() {
   const { addTask } = useContext(ProjectContext);
   return (
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
                     date: null,
                     createdAt: new Date(),
                  },
                  {
                     id: generateId(),
                     finished: false,
                     name: 'Task 2',
                     priority: 0,
                     duration: 90,
                     date: null,
                     createdAt: new Date(),
                  },
                  {
                     id: generateId(),
                     finished: false,
                     name: 'Task 3',
                     priority: 1,
                     duration: 45,
                     date: null,
                     createdAt: new Date(),
                  },
                  {
                     id: generateId(),
                     finished: false,
                     name: 'Task 4',
                     priority: 2,
                     duration: 15,
                     date: null,
                     createdAt: new Date(),
                  },
                  {
                     id: generateId(),
                     finished: false,
                     name: 'Task 5',
                     priority: 3,
                     duration: 5,
                     date: null,
                     createdAt: new Date(),
                  },
               ];
               tasks.forEach(task => addTask(task));
            }}
         >
            Load 5 tasks
         </button>
         <ButtonAddTask addTask={addTask} />
      </div>
   );
}

Project.Title = Title;
Project.InfoPanel = InfoPanel;
Project.Body = Body;
Project.Menu = Menu;
export default Project;
