import Task from '@components/Task';

import type { Task as TaskType, TaskActions } from '@data/types';
import Button from '@ui/Button';

type Props = Pick<TaskActions, 'editTask' | 'removeTask'> & {
   tasks: TaskType[];
};

const Body = ({ tasks, editTask, removeTask }: Props) => {
   console.log(tasks);
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
