import Task from '@components/Task';

import { groupTasksByDate } from '@frontend/utils/tasks';
import { formatDisplayDate, getDayOfWeek } from '@frontend/utils/time';
import useTasksWithDateQuery from './useTasksWithDateQuery';

const UpcomingBody = () => {
   const { data: tasks, isFetching, isSuccess } = useTasksWithDateQuery();
   if (isFetching) return <Template />;
   if (!isSuccess) return <div>Error fetching</div>;

   const dates = groupTasksByDate(tasks); // FIXME: very slow, calculating every rerender

   return (
      <div className="overflow-y-auto">
         <div className="gap-4 overflow-x-hidden pt-6 pr-1">
            {dates.map(([date, tasks]) => (
               <div key={date}>
                  {tasks.length !== 0 && (
                     <h3 className="my-1 opacity-80">
                        {formatDisplayDate(date)} {getDayOfWeek(date)}
                     </h3>
                  )}
                  <ul className="border-primary-400/50 ml-2 overflow-hidden border-l-1 px-8">
                     {tasks.map((task, i) => {
                        const delay = i * 0.05;
                        return (
                           <Task
                              key={task.id}
                              task={task}
                              animationDelay={delay}
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

const Template = () => {
   return (
      <div className="max-h-full overflow-y-auto">
         <div className="grid gap-4 overflow-x-hidden pr-1"></div>
      </div>
   );
};

export default UpcomingBody;
