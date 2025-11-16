import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { Task, TaskCreate } from '@frontend/data/types';
import { getFetchRequest } from '@frontend/utils/fetch';
import generateId from '@frontend/utils/generateId';
import useSettingsContext from '@hooks/useSettingsContext';
import { getTasksQueryKey } from '@frontend/utils/getTasksQueryKey';
import { useAuth } from '@clerk/clerk-react';

export const useAddTaskMutation = () => {
   const { settings } = useSettingsContext();
   const client = useQueryClient();
   const queryKey = getTasksQueryKey(settings.activeProjectId);
   const { getToken } = useAuth();
   return useMutation({
      mutationFn: async (task: TaskCreate) => {
         const token = await getToken();
         if (!token) throw new Error('Cannot generate token. Probably no user');
         const req = getFetchRequest('/api/tasks', 'POST', token, task);
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
         client.invalidateQueries({ queryKey });
         client.invalidateQueries({ queryKey: ['tasks', 'preset'] });
      },
   });
};
