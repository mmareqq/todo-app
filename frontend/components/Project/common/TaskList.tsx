import Task from '@components/Task';
import type { Task as TaskType } from '@types';

const TaskList = ({ tasks }: { tasks: TaskType[] }) => {
   return (
      <div className="max-h-full overflow-y-auto pt-4">
         <div className="grid gap-4 overflow-x-hidden">
            {tasks.map((task, i) => (
               <Task key={task.id} task={task} animationDelay={i * 0.05} />
            ))}
         </div>
      </div>
   );
};

export default TaskList;
