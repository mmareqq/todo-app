import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { TaskCreate } from '@types';
import { getFetchRequest } from '@frontend/utils/fetch';

export const useAddTaskMutation = () => {
   const client = useQueryClient();

   return useMutation({
      mutationKey: ['addTask'],
      mutationFn: async (task: TaskCreate) => {
         const req = getFetchRequest('/api/tasks', 'POST', {
            ...task,
            dueDate: task.dueDate?.toISOString() || null,
         });
         await fetch(req);
      },

      onSuccess: () => {
         client.invalidateQueries({ queryKey: ['tasks'] });
      },
   });
};
