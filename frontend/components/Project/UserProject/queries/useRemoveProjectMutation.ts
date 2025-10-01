import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { Id } from '@types';
import { getFetchRequest } from '@frontend/utils/fetch';

export const useRemoveProjectMutation = (projectId: Id) => {
   const client = useQueryClient();

   return useMutation({
      mutationKey: ['removeProject'],
      mutationFn: async () => {
         const req = getFetchRequest(`/api/projects/${projectId}`, 'DELETE');
         await fetch(req);
      },

      onSuccess: () => {
         client.removeQueries({ queryKey: ['project', projectId] });
         client.invalidateQueries({ queryKey: ['projects'] });
      },
   });
};
