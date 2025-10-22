import { useQuery } from '@tanstack/react-query';
import type { Project, Id } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';

const useProjectQuery = (projectId: Id) => {
   return useQuery({
      queryKey: ['project', projectId],
      queryFn: async (): Promise<Project> => {
         try {
            const req = getFetchRequest(`/api/projects/${projectId}`, 'GET');
            const json = await fetchJSON(req);
            return json;
         } catch (err) {
            console.log(err);
            throw err;
         }
      },
   });
};
export default useProjectQuery;
