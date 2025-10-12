import { useQuery } from '@tanstack/react-query';
import type { Task, Id } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';

export const useTasksQuery = (projectId: Id) => {
   return useQuery<Task[]>({
      queryKey: ['tasks', projectId],
      queryFn: async () => {
         try {
            const req = getFetchRequest(
               `/api/projects/${projectId}/tasks`,
               'GET',
            );
            const json = await fetchJSON(req);
            return json;
         } catch (err) {
            console.error(err);
         }
      },
   });
};

export const useTasksDurationQuery = (projectId: Id) => {
   const select = (data: Task[]) => {
      return data.reduce((acc, task) => acc + task.duration, 0);
   };

   return useQuery({
      queryKey: ['tasks', projectId],
      queryFn: async () => {
         const req = getFetchRequest(`/api/projects/${projectId}/tasks`, 'GET');
         const json = await fetchJSON(req);
         return json as Task[];
      },
      select,
   });
};
