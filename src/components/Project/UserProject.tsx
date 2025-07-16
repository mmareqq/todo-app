import { useMemo } from 'react';

import DialogProvider from '@contexts/DialogProvider';
import useTasks from '@hooks/useTasks';
import { sortTasks } from '@utils/tasks';

import Title from './components/Title';
import InfoPanel from './components/InfoPanel';
import Body from './components/Body';
import Menu from './components/Menu';

import EditProjectDialog from './components/EditProjectDialog';
import AddTaskDialog from './components/AddTaskDialog';

import type { ProjectActions } from '@data/types';
import useSettingsContext from '@hooks/useSettingsContext';

type Props = Pick<ProjectActions, 'project' | 'editProject'>;

function UserProject({ project, editProject }: Props) {
   const { settings } = useSettingsContext();

   const { tasks, addTask, removeTask, editTask } = useTasks(project.id);
   const sortedTasks = useMemo(
      () => sortTasks(tasks, settings.sortMethod),
      [tasks, settings.sortMethod],
   );

   const totalDuration = useMemo(
      () => tasks.reduce((acc, task) => task.duration + acc, 0),
      [tasks],
   );

   return (
      <div className="oveflow-y-hidden grid h-svh content-start items-start">
         <DialogProvider>
            <Title title={project.name} isEditable={project.editable} />
            <EditProjectDialog project={project} editProject={editProject} />
         </DialogProvider>
         <InfoPanel totalDuration={totalDuration} />
         <Body
            tasks={sortedTasks}
            editTask={editTask}
            removeTask={removeTask}
         />

         <DialogProvider>
            <Menu addTask={addTask} projectId={project.id} />
            <AddTaskDialog addTask={addTask} projectId={project.id} />
         </DialogProvider>
      </div>
   );
}

export default UserProject;
