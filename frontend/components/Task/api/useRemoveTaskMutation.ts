import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { Id, Task } from '@frontend/data/types';
import { getFetchRequest } from '@frontend/utils/fetch';
import useSettingsContext from '@hooks/useSettingsContext';
import { getTasksQueryKey } from '@frontend/utils/getTasksQueryKey';
const useRemoveTaskMutation = () => {
   const client = useQueryClient();
   const { settings } = useSettingsContext();
   const queryKey = getTasksQueryKey(settings.activeProjectId);

   return useMutation({
      mutationFn: async (taskId: Id) => {
         const req = getFetchRequest(`/api/tasks/${taskId}`, 'DELETE');
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
