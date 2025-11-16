import { useQueryClient, useMutation } from '@tanstack/react-query';
import { getFetchRequest } from '@frontend/utils/fetch';
import type { Project, ProjectCreate } from '@types';
import generateId from '@frontend/utils/generateId';
import { useAuth } from '@clerk/clerk-react';

const useProjectAddMutation = () => {
   const client = useQueryClient();
   const { getToken } = useAuth();

   return useMutation({
      mutationFn: async (project: ProjectCreate) => {
         const token = await getToken();
         if (!token) throw new Error('Cannot generate token. Probably no user');
         const req = getFetchRequest('/api/projects', 'POST', token, {
            name: project.name,
            type: project.type,
         });
         await fetch(req);
      },

      onMutate: async project => {
         await client.cancelQueries({ queryKey: ['projects'] });

         const prevProjects = client.getQueryData(['projects']);

         client.setQueryData<Project[]>(['projects'], (old = []) => [
            ...old,
            { id: generateId(), ...project },
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
