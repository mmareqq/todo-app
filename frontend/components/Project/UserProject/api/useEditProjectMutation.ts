import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { ProjectUpdate, Project } from '@types';
import { getFetchRequest } from '@frontend/utils/fetch';
import { useAuth } from '@clerk/clerk-react';

const useEditProjectMutation = (project: Project) => {
   const client = useQueryClient();
   const { getToken } = useAuth();
   const queryKey = ['project', project.id];
   return useMutation({
      mutationFn: async (projectUpdates: ProjectUpdate) => {
         const token = await getToken();
         if (!token) throw new Error('Cannot generate token. Probably no user');
         const req = getFetchRequest(
            `/api/projects/${project.id}`,
            'PATCH',
            token,
            projectUpdates,
         );
         await fetch(req);
      },

      onMutate: async projectUpdates => {
         await Promise.all([
            client.cancelQueries({ queryKey }),
            client.cancelQueries({ queryKey: ['projects'] }),
         ]);
         const prevProject = client.getQueryData<Project>(queryKey);
         const prevProjects = client.getQueryData<Project[]>(['projects']);

         client.setQueryData<Project[]>(['projects'], (old = []) =>
            old.map(p =>
               p.id === project.id ? { ...project, ...projectUpdates } : p,
            ),
         );
         client.setQueryData<Project>(queryKey, () => ({
            ...project,
            ...projectUpdates,
         }));

         return { prevProjects, prevProject };
      },

      onError: (err, proj, mutateResult) => {
         if (mutateResult?.prevProjects) {
            client.setQueryData(['projects'], mutateResult.prevProjects);
         }
         if (mutateResult?.prevProject) {
            client.setQueryData(queryKey, mutateResult.prevProject);
         }
      },

      onSettled: () => {
         client.invalidateQueries({ queryKey });
         client.invalidateQueries({ queryKey: ['projects'] }); // navbar projects buttons
      },
   });
};
export default useEditProjectMutation;
