import Task from '@components/Task';

import useTasksQuery from './queries/useTasksQuery';
import type { Id } from '@frontend/data/types';

const UserBody = ({ projectId }: { projectId: Id }) => {
   const { data: tasks, isPending } = useTasksQuery(projectId);
   if (isPending) return 'Fetching...';
   if (!tasks) return 'Error fethcing tasks in UserBody';
   const sortedTasks = []; // FIXME: sort tasks in query
   return (
      <div className="max-h-full overflow-y-auto">
         <div className="grid gap-4 overflow-x-hidden pr-1">
            {tasks.map((task, i) => {
               return (
                  <Task key={task.id} task={task} animationDelay={i * 0.05} />
               );
            })}
         </div>
      </div>
   );
};

export default UserBody;
