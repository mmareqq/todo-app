import { useQuery } from '@tanstack/react-query';
import type { Task } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';

const useTasksWithDateQuery = () => {
   return useQuery<Task[]>({
      queryKey: ['tasks', 'tasks-with-date'],
      queryFn: async () => {
         const req = getFetchRequest(`/api/tasks`, 'GET');
         const json = await fetchJSON(req);
         return json;
      },
   });
};
export default useTasksWithDateQuery;
