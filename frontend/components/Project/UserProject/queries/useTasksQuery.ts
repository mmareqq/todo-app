import { useQuery } from '@tanstack/react-query';
import type { Task, Id } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';

const useTasksQuery = (projectId: Id) => {
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

export default useTasksQuery;
