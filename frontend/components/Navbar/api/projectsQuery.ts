import { useQuery } from '@tanstack/react-query';
import type { Project } from '@frontend/data/types';

import { fetchJSON, getFetchRequest } from '@frontend/utils/fetch';
import { useAuth } from '@clerk/clerk-react';

export const useProjectsQuery = () => {
   const { getToken } = useAuth();
   return useQuery({
      queryKey: ['projects'],
      queryFn: async () => {
         try {
            const token = await getToken();
            if (!token) throw new Error('cannot generate token for request');
            const req = getFetchRequest('/api/projects', 'GET', token);
            console.log('hitting', req.url);
            const json = await fetchJSON(req);
            return json as Project[];
         } catch (err) {
            console.log(err);
            throw err;
         }
      },
   });
};

export const useInboxProjectQuery = () => {
   const { getToken } = useAuth();
   return useQuery({
      queryKey: ['projects', 'inbox'],
      queryFn: async () => {
         try {
            const token = await getToken();
            if (!token) throw new Error('cannot generate token for request');
            const req = getFetchRequest('/api/projects/inbox', 'POST', token);
            const json = await fetchJSON(req);
            return json as Project;
         } catch (err) {
            console.log(err);
            throw err;
         }
      },
   });
};
