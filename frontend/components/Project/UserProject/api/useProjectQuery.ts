import { useQuery } from '@tanstack/react-query';
import type { Project, Id } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';
import { useAuth } from '@clerk/clerk-react';

const useProjectQuery = (projectId: Id) => {
   const { getToken } = useAuth();
   return useQuery({
      queryKey: ['project', projectId],
      queryFn: async (): Promise<Project> => {
         try {
            const token = await getToken();
            if (!token)
               throw new Error('Cannot generate token. Probably no user');
            const req = getFetchRequest(
               `/api/projects/${projectId}`,
               'GET',
               token,
            );
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
