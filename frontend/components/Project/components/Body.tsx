import { useMemo } from 'react';
import Task from '@components/Task';
import Button from '@ui/Button';
import { sortTasks } from '@frontend/utils/tasks';

import type { Task as TaskType, TaskActions } from '@frontend/data/types';

type Props = {
   tasks: TaskType[];
   editTask: TaskActions['editTask'];
   removeTask: TaskActions['removeTask'];
};

import useSettingsContext from '@hooks/useSettingsContext';

const Body = ({ tasks, editTask, removeTask }: Props) => {
   const { settings } = useSettingsContext();
   const sortedTasks = useMemo(
      () => sortTasks(tasks, settings.sortMethod),
      [tasks, settings.sortMethod],
   );
   return (
      <div className="max-h-full overflow-y-auto">
         <div className="grid gap-4 overflow-x-hidden pr-1">
            <Button
               variant="dropdown"
               onClick={() => {
                  sortedTasks.forEach(({ id }) => removeTask(id));
                  // to be deleted
                  const btn = document.querySelector('#btn-tasks-debug');
                  btn?.classList.remove('hidden');
               }}
            >
               Remove all
            </Button>
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
};

export default Body;
