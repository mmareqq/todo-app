import { useQueryClient, useMutation } from '@tanstack/react-query';
import { getFetchRequest } from '@frontend/utils/fetch';
import type { ProjectCreate } from '@types';

const useProjectAddMutation = () => {
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

export default useProjectAddMutation;
