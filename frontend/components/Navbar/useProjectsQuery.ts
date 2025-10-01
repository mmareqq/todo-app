import { useQuery } from '@tanstack/react-query';
import type { Project } from '@frontend/data/types';

import { fetchJSON, getFetchRequest } from '@frontend/utils/fetch';

const useProjectsQuery = () => {
   return useQuery<Project[]>({
      queryKey: ['projects'],
      queryFn: async () => {
         const req = getFetchRequest('/api/projects', 'GET');
         const json = await fetchJSON(req);
         return json;
      },
   });
};

export default useProjectsQuery;
