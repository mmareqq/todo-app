import { useQuery } from '@tanstack/react-query';
import type { Task } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';
import { groupTasksByDate } from '@frontend/utils/tasks';
import { appProjects } from '@frontend/data/data';

const useTasksWithDateQuery = () => {
   const select = (tasks: Task[]) => groupTasksByDate(tasks, true);
   return useQuery({
      queryKey: ['tasks', appProjects.upcoming.id],
      queryFn: async (): Promise<Task[]> => {
         const req = getFetchRequest(`/api/tasks`, 'GET');
         const json = await fetchJSON(req);
         return json;
      },
      select,
   });
};
export default useTasksWithDateQuery;
