import Task from '@components/Task';

import useTasksQuery from '../UserProject/queries/useTasksQuery';
import { appProjects } from '@frontend/data/data';

const InboxBody = () => {
   const { data: tasks, isPending } = useTasksQuery(appProjects.inbox.id);
   if (isPending) return 'Fetching...';
   if (!tasks) return 'Error fethcing tasks in InboxBody';
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

export default InboxBody;
