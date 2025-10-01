import { useQuery } from '@tanstack/react-query';
import type { Task } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';
import { z_Task } from '@types';
import z from 'zod';
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
