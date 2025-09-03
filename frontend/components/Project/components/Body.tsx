import Task from '@components/Task';
import Button from '@ui/Button';

import type { TaskActions } from '@data/types';

type Props = {
   tasks: TaskActions['task'][];
   editTask: TaskActions['editTask'];
   removeTask: TaskActions['removeTask'];
};

const Body = ({ tasks, editTask, removeTask }: Props) => {
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
