import { useQuery } from '@tanstack/react-query';
import type { Task } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';
import { groupTasksByDate } from '@frontend/utils/tasks';
import { appProjects } from '@frontend/data/data';
import { getTasksQueryKey } from '@frontend/utils/getTasksQueryKey';

const useUpcomingTasks = () => {
   const select = (tasks: Task[]) => groupTasksByDate(tasks);
   const path = `/api/projects/${encodeURIComponent(appProjects.upcoming.id)}/tasks`;
   return useQuery({
      queryKey: getTasksQueryKey(appProjects.upcoming.id),
      queryFn: async (): Promise<Task[]> => {
         const req = getFetchRequest(path, 'GET');
         const json = await fetchJSON(req);
         return json;
      },
      select,
   });
};
export default useUpcomingTasks;
