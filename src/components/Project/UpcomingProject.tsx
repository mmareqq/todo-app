import { useMemo } from 'react';

import DialogProvider from '@contexts/DialogProvider';
import useTasks from '@hooks/useTasks';
import { groupTasksByDate } from '@utils/tasks';

import Title from './components/Title';
import UpcomingBody from './components/UpcomingBody';
import Menu from './components/Menu';
import AddTaskDialog from './components/AddTaskDialog';

import type { Project } from '@data/types';

type Props = {
   project: Project;
};

const UpcomingProject = ({ project }: Props) => {
   const { tasks, addTask, removeTask, editTask } = useTasks(project.id);
   const groupedTasks = useMemo(() => groupTasksByDate(tasks), [tasks]);

   return (
      <div className="oveflow-y-hidden grid h-svh content-start items-start">
         <Title title={project.name} isEditable={false} />
         <UpcomingBody
            tasks={groupedTasks}
            editTask={editTask}
            removeTask={removeTask}
         />
         <DialogProvider>
            <Menu addTask={addTask} projectId={project.id} />
            <AddTaskDialog addTask={addTask} projectId={project.id} />
         </DialogProvider>
      </div>
   );
};

export default UpcomingProject;
