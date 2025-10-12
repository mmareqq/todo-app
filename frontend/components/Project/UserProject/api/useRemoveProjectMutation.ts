import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { Id, Project } from '@types';
import { getFetchRequest } from '@frontend/utils/fetch';

export const useRemoveProjectMutation = (projectId: Id) => {
   const client = useQueryClient();

   return useMutation({
      mutationFn: async () => {
         const req = getFetchRequest(`/api/projects/${projectId}`, 'DELETE');
         const tasksReq = getFetchRequest(`/api/${projectId}/tasks`, 'DELETE');
         await Promise.all([fetch(req), fetch(tasksReq)]);
      },

      onMutate: async () => {
         await Promise.all([client.cancelQueries({ queryKey: ['projects'] })]);

         const prevProjects = client.getQueryData<Project[]>(['projects']);

         client.setQueryData<Project[]>(['projects'], (old = []) =>
            old.filter(p => p.id !== projectId),
         );

         return { prevProjects };
      },
      onError: (err, _, mutateResult) => {
         if (mutateResult?.prevProjects) {
            client.setQueryData(['projects'], mutateResult.prevProjects);
         }
      },

      onSettled: () => {
         client.invalidateQueries({ queryKey: ['projects'] });
      },

      onSuccess: () => {
         client.removeQueries({ queryKey: ['project', projectId] });
         client.removeQueries({ queryKey: ['tasks', projectId] });
      },
   });
};
