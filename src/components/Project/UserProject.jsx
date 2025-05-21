import { useMemo } from 'react';

import useSettingsContext from '@hooks/useSettingsContext';
import useTasks from '@hooks/useTasks';
import sortTasks from '@utils/sortTasks';

import Title from './components/Title';
import InfoPanel from './components/InfoPanel';
import Body from './components/Body';
import Menu from './components/Menu';

function UserProject({ project }) {
   const { settings } = useSettingsContext();
   const { tasks, addTask, removeTask, editTask } = useTasks(project.id);

   const sortedTasks = useMemo(
      () => sortTasks(tasks, settings.sortMethod),
      [tasks, settings.sortMethod],
   );
   const totalDuration = tasks.reduce((acc, task) => task.duration + acc, 0);

   return (
      <div className="oveflow-y-hidden grid h-svh content-start items-start">
         <Title project={project} />
         <InfoPanel totalDuration={totalDuration} />
         <Body
            tasks={sortedTasks}
            editTask={editTask}
            removeTask={removeTask}
         />
         <Menu addTask={addTask} />
      </div>
   );
}

export default UserProject;
