import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { TaskUpdate, Task } from '@frontend/data/types';
import { getFetchRequest } from '@frontend/utils/fetch';
import useSettingsContext from '@hooks/useSettingsContext';
import { getTasksQueryKey } from '@frontend/utils/getTasksQueryKey';

export const useEditTaskMutation = (task: Task) => {
   const client = useQueryClient();
   const { settings } = useSettingsContext();
   const queryKey = getTasksQueryKey(settings.activeProjectId);

   return useMutation({
      mutationFn: async (editedTask: TaskUpdate) => {
         const req = getFetchRequest(
            `/api/tasks/${task.id}`,
            'PATCH',
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
