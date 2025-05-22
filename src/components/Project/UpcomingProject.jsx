import { useMemo } from 'react';

import useTasks from '@hooks/useTasks';
import sortTasks from '@utils/sortTasks';

import Title from './components/Title';
import DialogProvider from '@contexts/DialogProvider';

import UpcomingBody from './components/UpcomingBody';
import Menu from './components/Menu';
import AddTaskDialog from './components/AddTaskDialog';

function UpcomingProject({ project }) {
   const { tasks, addTask, removeTask, editTask } = useTasks(project.id);
   const groupedTasks = useMemo(() => sortTasks(tasks, 'groupByDate'), [tasks]);

   return (
      <div className="oveflow-y-hidden grid h-svh content-start items-start">
         <Title project={project} editable={false} />
         <UpcomingBody
            tasks={groupedTasks}
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

export default UpcomingProject;
