import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { ProjectUpdate, Id } from '@types';
import { getFetchRequest } from '@frontend/utils/fetch';

const useEditProjectMutation = (projectId: Id) => {
   const client = useQueryClient();

   return useMutation({
      mutationKey: ['editProject'],
      mutationFn: async (project: ProjectUpdate) => {
         const req = getFetchRequest(
            `/api/projects/${projectId}`,
            'PATCH',
            project,
         );
         await fetch(req);
      },

      onSuccess: () => {
         client.invalidateQueries({ queryKey: ['project', projectId] });
         client.invalidateQueries({ queryKey: ['projects'] }); // navbar project buttons
      },
   });
};
export default useEditProjectMutation;
