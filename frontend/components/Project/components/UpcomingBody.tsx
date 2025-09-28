import Task from '@components/Task';

import { groupTasksByDate } from '@frontend/utils/tasks';
import { formatDisplayDate, getDayOfWeek } from '@frontend/utils/time';
import { useTasksWithDateQuery } from '../queries';

const UpcomingBody = () => {
   const { data: tasks, isFetching, isSuccess } = useTasksWithDateQuery();
   if (isFetching) return <div>Fetching...</div>;
   if (!isSuccess) return <div>Error fetching</div>;

   const dates = groupTasksByDate(tasks); // FIXME: very slow, calculating every rerender

   return (
      <div className="max-h-full overflow-y-auto">
         <div className="grid gap-4 overflow-x-hidden pr-1">
            {dates.map(([date, tasks]) => (
               <div key={date}>
                  <h3 className="opacity-50">
                     {formatDisplayDate(date)} {getDayOfWeek(date)}
                  </h3>
                  <ul>
                     {tasks.map((task, i) => {
                        return (
                           <Task
                              key={task.id}
                              task={task}
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
