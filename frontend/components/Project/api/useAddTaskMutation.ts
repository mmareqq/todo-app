import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { Task, TaskCreate } from '@frontend/data/types';
import { getFetchRequest } from '@frontend/utils/fetch';
import generateId from '@frontend/utils/generateId';
import useSettingsContext from '@hooks/useSettingsContext';

export const useAddTaskMutation = () => {
   const { settings } = useSettingsContext();
   const client = useQueryClient();
   const queryKey = ['tasks', settings.activeProjectId];

   return useMutation({
      mutationFn: async (task: TaskCreate) => {
         const req = getFetchRequest('/api/tasks', 'POST', task);
         await fetch(req);
      },

      onMutate: async task => {
         await client.cancelQueries({ queryKey });

         const prevTasks = client.getQueryData(queryKey);

         client.setQueryData<Task[]>(queryKey, (old = []) => [
            ...old,
            { id: generateId(), ...task },
         ]);

         return { prevTasks };
      },

      onError: (err, newTask, mutateResult) => {
         if (mutateResult?.prevTasks) {
            client.setQueryData(queryKey, mutateResult.prevTasks);
         }
      },
      onSettled: () => {
         console.log('invalidating:', queryKey);
         client.invalidateQueries({ queryKey });
      },
   });
};
