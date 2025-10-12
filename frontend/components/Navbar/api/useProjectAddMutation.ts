import { useQueryClient, useMutation } from '@tanstack/react-query';
import { getFetchRequest } from '@frontend/utils/fetch';
import type { Project, ProjectCreate } from '@types';
import generateId from '@frontend/utils/generateId';
const useProjectAddMutation = () => {
   const client = useQueryClient();

   return useMutation({
      mutationFn: async (project: ProjectCreate) => {
         const req = getFetchRequest('/api/projects', 'POST', {
            name: project.name,
         });
         await fetch(req);
      },

      onMutate: async project => {
         await client.cancelQueries({ queryKey: ['projects'] });

         const prevProjects = client.getQueryData(['projects']);

         client.setQueryData<Project[]>(['projects'], (old = []) => [
            ...old,
            { id: generateId(), type: 'custom', ...project },
         ]);

         return { prevProjects };
      },

      onError: (err, project, context) => {
         if (context?.prevProjects) {
            client.setQueryData(['projects'], context.prevProjects);
         }
      },
      onSettled: () => client.invalidateQueries({ queryKey: ['projects'] }),
   });
};

export default useProjectAddMutation;
