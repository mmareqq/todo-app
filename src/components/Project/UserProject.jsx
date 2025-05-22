import { useMemo } from 'react';

import useSettingsContext from '@hooks/useSettingsContext';
import useTasks from '@hooks/useTasks';
import sortTasks from '@utils/sortTasks';

import Title from './components/Title';
import InfoPanel from './components/InfoPanel';
import Body from './components/Body';
import Menu from './components/Menu';

import DialogProvider from '@contexts/DialogProvider';
import EditProjectDialog from './components/EditProjectDialog';
import AddTaskDialog from './components/AddTaskDialog';

function UserProject({ project, editProject }) {
   const { settings } = useSettingsContext();
   const { tasks, addTask, removeTask, editTask } = useTasks(project.id);

   const sortedTasks = useMemo(
      () => sortTasks(tasks, settings.sortMethod),
      [tasks, settings.sortMethod],
   );
   const totalDuration = tasks.reduce((acc, task) => task.duration + acc, 0);

   return (
      <div className="oveflow-y-hidden grid h-svh content-start items-start">
         <DialogProvider>
            <Title project={project} />
            <EditProjectDialog project={project} editProject={editProject} />
         </DialogProvider>
         <InfoPanel totalDuration={totalDuration} />
         <Body
            tasks={sortedTasks}
            editTask={editTask}
            removeTask={removeTask}
         />

         <DialogProvider>
            <Menu addTask={addTask} />
            <AddTaskDialog addTask={addTask} />
         </DialogProvider>
      </div>
   );
}

export default UserProject;
