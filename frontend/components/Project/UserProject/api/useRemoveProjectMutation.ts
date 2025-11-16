import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { Id, Project } from '@types';
import { getFetchRequest } from '@frontend/utils/fetch';
import { useAuth } from '@clerk/clerk-react';

export const useRemoveProjectMutation = (projectId: Id) => {
   const client = useQueryClient();
   const { getToken } = useAuth();
   return useMutation({
      mutationFn: async () => {
         const token = await getToken();
         if (!token) throw new Error('Cannot generate token. Probably no user');
         const req = getFetchRequest(
            `/api/projects/${projectId}`,
            'DELETE',
            token,
         );
         const tasksReq = getFetchRequest(
            `/api/${projectId}/tasks`,
            'DELETE',
            token,
         );
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
