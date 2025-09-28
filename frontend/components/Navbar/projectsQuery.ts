import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Project, ProjectCreate } from '@frontend/data/types';

import { fetchJSON, getFetchRequest } from '@frontend/utils/fetch';

export const useProjectsQuery = () => {
   return useQuery<Project[]>({
      queryKey: ['projects'],
      queryFn: async () => {
         const req = getFetchRequest('/api/projects', 'GET');
         const json = await fetchJSON(req);
         return json;
      },
   });
};

export const useProjectAddMutation = () => {
   const client = useQueryClient();

   return useMutation({
      mutationKey: ['addProject'],
      mutationFn: async (project: ProjectCreate) => {
         const req = getFetchRequest('/api/projects', 'POST', {
            name: project.name,
         });
         await fetch(req);
      },

      onSuccess: () => {
         client.invalidateQueries({ queryKey: ['projects'] });
      },
   });
};
