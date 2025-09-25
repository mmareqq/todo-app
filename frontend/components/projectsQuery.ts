import { useMutation, useQuery } from '@tanstack/react-query';
import type { Project } from '@frontend/data/types';

import { getFetchRequest } from '@frontend/data/fetch';

export const useProjectsQuery = () => {
   return useQuery<Project[]>({
      queryKey: ['projects'],
      queryFn: async () => {
         const req = getFetchRequest('/api/projects', 'GET');
         const json = await fetch(req).then(res => res.json());
         return JSON.parse(json);
      },
   });
};

export const useProjectAddMutation = () => {
   return useMutation({
      mutationKey: ['addProject'],
      mutationFn: async (project: Project) => {
         console.log('creating post request');
         const req = getFetchRequest('/api/projects', 'POST', {
            name: project.name,
         });
         await fetch(req);
      },
   });
};
