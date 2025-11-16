import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { TaskUpdate, Task } from '@frontend/data/types';
import { getFetchRequest } from '@frontend/utils/fetch';
import useSettingsContext from '@hooks/useSettingsContext';
import { getTasksQueryKey } from '@frontend/utils/getTasksQueryKey';
import { useAuth } from '@clerk/clerk-react';

export const useEditTaskMutation = (task: Task) => {
   const client = useQueryClient();
   const { settings } = useSettingsContext();
   const queryKey = getTasksQueryKey(settings.activeProjectId);
   const { getToken } = useAuth();

   return useMutation({
      mutationFn: async (editedTask: TaskUpdate) => {
         const token = await getToken();
         if (!token) throw new Error('Cannot generate token. Probably no user');
         const req = getFetchRequest(
            `/api/tasks/${task.id}`,
            'PATCH',
            token,
            editedTask,
         );
         await fetch(req);
      },
      onMutate: async taskUpdates => {
         await client.cancelQueries({ queryKey });

         const prevTasks = client.getQueryData<Task[]>(queryKey);

         client.setQueryData<Task[]>(queryKey, (old = []) =>
            old.map(t => (t.id === task.id ? { ...task, ...taskUpdates } : t)),
         );

         return { prevTasks };
      },
      onError: (err, taskUpdates, mutateResult) => {
         if (mutateResult?.prevTasks) {
            client.setQueryData(queryKey, mutateResult.prevTasks);
         }
      },
      onSettled: (data, error, taskUpdates) => {
         client.invalidateQueries({ queryKey });
         client.invalidateQueries({ queryKey: ['tasks', 'preset'] });
         if (taskUpdates.projectId) {
            // if task was moved between projects
            client.invalidateQueries({
               queryKey: ['tasks', taskUpdates.projectId],
            });
         }
      },
   });
};
