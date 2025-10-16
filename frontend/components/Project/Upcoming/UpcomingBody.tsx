import Task from '@components/Task';

import { formatDisplayDate, getDayOfWeek } from '@frontend/utils/time';
import useTasksWithDateQuery from './useTasksWithDateQuery';

const UpcomingBody = () => {
   const { data: groupedTasks = [], isError } = useTasksWithDateQuery();
   if (isError) return <div>Error fetching</div>;

   return (
      <div className="overflow-y-auto">
         <div className="grid gap-4 overflow-x-hidden pt-6 pr-1">
            {groupedTasks.map(([date, tasks]) => (
               <div key={date}>
                  {tasks.length !== 0 && (
                     <h3 className="my-1 opacity-80">
                        {formatDisplayDate(date, 'short')} {getDayOfWeek(date)}
                     </h3>
                  )}
                  <ul className="border-primary-400/20 ml-2 grid gap-2 overflow-hidden border-l-1 px-8">
                     {tasks.map(task => (
                        <Task key={task.id} task={task} />
                     ))}
                  </ul>
               </div>
            ))}
         </div>
      </div>
   );
};

export default UpcomingBody;
