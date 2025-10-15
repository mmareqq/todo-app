import { useQuery } from '@tanstack/react-query';
import type { Project, Id } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';

const useProjectQuery = (projectId: Id) => {
   return useQuery({
      queryKey: ['project', projectId],
      queryFn: async (): Promise<Project> => {
         const req = getFetchRequest(`/api/projects/${projectId}`, 'GET');
         const json = await fetchJSON(req);
         return json;
      },
   });
};
export default useProjectQuery;
