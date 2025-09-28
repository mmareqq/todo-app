import { useMemo } from 'react';
import Task from '@components/Task';
import { sortTasks } from '@frontend/utils/tasks';

import type { Task as TaskType } from '@frontend/data/types';

import useSettingsContext from '@hooks/useSettingsContext';

const Body = ({ tasks }: { tasks: TaskType[] }) => {
   const { settings } = useSettingsContext();
   const sortedTasks = useMemo(
      () => sortTasks(tasks, settings.sortMethod),
      [tasks, settings.sortMethod],
   );

   return (
      <div className="max-h-full overflow-y-auto">
         <div className="grid gap-4 overflow-x-hidden pr-1">
            {sortedTasks.map((task, i) => {
               return (
                  <Task key={task.id} task={task} animationDelay={i * 0.05} />
               );
            })}
         </div>
      </div>
   );
};

export default Body;
