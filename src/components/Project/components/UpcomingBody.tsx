import Button from '@ui/Button';
import Task from '@components/Task';

import { useMemo } from 'react';

import type { TaskActions } from '@data/types';
import { groupTasksByDate } from '@utils/tasks';

type Props = {
   tasks: TaskActions['task'][];
   editTask: TaskActions['editTask'];
   removeTask: TaskActions['removeTask'];
};

const UpcomingBody = ({ tasks, editTask, removeTask }: Props) => {
   const dates = useMemo(() => groupTasksByDate(tasks), [tasks]);

   const renderTasks = (tasks: Task[]) => {
      return tasks.map((task, i) => {
         <Task
            key={task.id}
            task={task}
            editTask={editTask}
            removeTask={removeTask}
            animationDelay={i * 0.05}
         />;
      });
   };

   const renderDates = () => {
      for (const date in dates) {
         const tasks = dates[date];
         return renderTasks(tasks);
      }
   };

   return (
      <div className="max-h-full overflow-y-auto">
         <div className="grid gap-4 overflow-x-hidden pr-1">
            <Button
               variant="dropdown"
               onClick={() => {
                  tasks.forEach(({ id }) => removeTask(id));
                  // to be deleted
                  const btn = document.querySelector('#btn-tasks-debug');
                  btn?.classList.remove('hidden');
               }}
            >
               Remove all
            </Button>
            {Object.entries(dates).map(([date, tasks]) => (
               <div>
                  <h3 key={date}>{date}</h3>
                  <ul>
                     {tasks.map((task, i) => {
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
                  </ul>
               </div>
            ))}
         </div>
      </div>
   );
};

export default UpcomingBody;
