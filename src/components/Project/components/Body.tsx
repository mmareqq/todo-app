import Task from '@components/Task';

import type { TaskActions, Task as TaskType } from '@data/types';

type Props = Pick<TaskActions, 'editTask' | 'removeTask'> & { tasks: Task[] };

const Body = ({ tasks, editTask, removeTask }: Props) => {
   return (
      <div className="max-h-full overflow-y-auto">
         <div className="grid gap-4 overflow-x-hidden pr-1">
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
         </div>
      </div>
   );
};

export default Body;
