import { useQuery } from '@tanstack/react-query';
import type { Project } from '@frontend/data/types';

import { fetchJSON, getFetchRequest } from '@frontend/utils/fetch';
import { useAuth } from '@clerk/clerk-react';
const useProjectsQuery = () => {
   const { getToken } = useAuth();
   return useQuery<Project[]>({
      queryKey: ['projects'],
      queryFn: async () => {
         try {
            const token = await getToken();
            if (!token) throw new Error('cannot generate token for request');
            const req = getFetchRequest('/api/projects', 'GET', token);
            console.log('hitting', req.url);
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
