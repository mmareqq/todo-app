import { useQuery } from '@tanstack/react-query';
import type { Task } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';

export const useTodayTasksQuery = () => {
   return useQuery<Task[]>({
      queryKey: ['tasks', 'tasks-today'],
      queryFn: async () => {
         const req = getFetchRequest(`/api/tasks/today`, 'GET');
         const json = await fetchJSON(req);
         console.log('today tasks json', json);
         return json;
      },
   });
};
