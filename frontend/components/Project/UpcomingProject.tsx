import DialogProvider from '@contexts/DialogProvider';
import useTasks from '@hooks/useTasks';

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

   return (
      <div className="oveflow-y-hidden wrapper grid h-svh content-start items-start">
         <Title title={project.name} isEditable={false} />
         <UpcomingBody
            tasks={tasks}
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
