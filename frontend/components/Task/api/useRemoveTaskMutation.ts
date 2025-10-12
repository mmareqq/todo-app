import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { Task } from '@types';
import { getFetchRequest } from '@frontend/utils/fetch';
const useRemoveTaskMutation = (task: Task) => {
   const client = useQueryClient();
   const queryKey = ['tasks', task.projectId];

   return useMutation({
      mutationFn: async () => {
         const req = getFetchRequest(`/api/tasks/${task.id}`, 'DELETE');
         await fetch(req);
      },

      onMutate: async () => {
         await client.cancelQueries({ queryKey });
         const prevTasks = client.getQueryData<Task[]>(queryKey);

         client.setQueryData<Task[]>(queryKey, (old = []) =>
            old.filter(t => t.id !== task.id),
         );

         return { prevTasks };
      },

      onError: (err, _, mutateResult) => {
         if (mutateResult?.prevTasks) {
            client.setQueryData(queryKey, mutateResult.prevTasks);
         }
      },

      onSettled: () => {
         client.invalidateQueries({ queryKey });
      },
   });
};

export default useRemoveTaskMutation;
