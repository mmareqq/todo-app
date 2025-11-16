import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { Id, Task } from '@frontend/data/types';
import { getFetchRequest } from '@frontend/utils/fetch';
import useSettingsContext from '@hooks/useSettingsContext';
import { getTasksQueryKey } from '@frontend/utils/getTasksQueryKey';
import { useAuth } from '@clerk/clerk-react';

const useRemoveTaskMutation = () => {
   const client = useQueryClient();
   const { settings } = useSettingsContext();
   const queryKey = getTasksQueryKey(settings.activeProjectId);
   const { getToken } = useAuth();

   return useMutation({
      mutationFn: async (taskId: Id) => {
         const token = await getToken();
         if (!token) throw new Error('Cannot generate token. Probably no user');
         const req = getFetchRequest(`/api/tasks/${taskId}`, 'DELETE', token);
         await fetch(req);
      },

      onMutate: async (taskId: Id) => {
         await client.cancelQueries({ queryKey });
         const prevTasks = client.getQueryData<Task[]>(queryKey);

         client.setQueryData<Task[]>(queryKey, (old = []) =>
            old.filter(t => t.id !== taskId),
         );

         return { prevTasks };
      },

      onError: (err, taskId, mutateResult) => {
         if (mutateResult?.prevTasks) {
            client.setQueryData(queryKey, mutateResult.prevTasks);
         }
      },

      onSettled: () => {
         client.invalidateQueries({ queryKey });
         client.invalidateQueries({ queryKey: ['tasks', 'preset'] });
      },
   });
};

export default useRemoveTaskMutation;
