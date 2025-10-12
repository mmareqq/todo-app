import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { TaskUpdate, Task } from '@types';
import { getFetchRequest } from '@frontend/utils/fetch';

export const useEditTaskMutation = (task: Task) => {
   const client = useQueryClient();
   const key = ['tasks', task.projectId];
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
         await client.cancelQueries({ queryKey: key });

         const prevTasks = client.getQueryData<Task[]>(key);

         client.setQueryData<Task[]>(key, (old = []) =>
            old.map(t => (t.id === task.id ? { ...task, ...taskUpdates } : t)),
         );

         return { prevTasks };
      },
      onError: (err, taskUpdates, mutateResult) => {
         if (mutateResult?.prevTasks) {
            client.setQueryData(key, mutateResult.prevTasks);
         }
      },
      onSettled: (data, error, taskUpdates) => {
         client.invalidateQueries({ queryKey: key });
         if (taskUpdates.projectId) {
            // if task was moved between projects
            client.invalidateQueries({
               queryKey: ['tasks', taskUpdates.projectId],
            });
         }
      },
   });
};
