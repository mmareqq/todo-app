import Task from '@components/Task';
import type { Task as TaskType } from '@frontend/data/types';

type Props = {
   tasks: TaskType[];
};

const TaskList = ({ tasks }: Props) => {
   return (
      <div className="max-h-full overflow-y-auto pt-4">
         <div className="grid gap-4 overflow-x-hidden">
            {tasks.map(task => (
               <Task key={task.id} task={task} />
            ))}
         </div>
      </div>
   );
};

export default TaskList;
