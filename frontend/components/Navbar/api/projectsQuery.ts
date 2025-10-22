import { useQuery } from '@tanstack/react-query';
import type { Project } from '@frontend/data/types';

import { fetchJSON, getFetchRequest } from '@frontend/utils/fetch';

const useProjectsQuery = () => {
   return useQuery<Project[]>({
      queryKey: ['projects'],
      queryFn: async () => {
         try {
            const req = getFetchRequest('/api/projects', 'GET');
            const json = await fetchJSON(req);
            return json;
         } catch (err) {
            console.log(err);
            throw err;
         }
      },
   });
};

export default useProjectsQuery;
