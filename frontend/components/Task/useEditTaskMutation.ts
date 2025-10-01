import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { TaskUpdate, Id } from '@types';
import { getFetchRequest } from '@frontend/utils/fetch';

export const useEditTaskMutation = (taskId: Id) => {
   const client = useQueryClient();

   return useMutation({
      mutationKey: ['editTask'],
      mutationFn: async (editedTask: TaskUpdate) => {
         const req = getFetchRequest(`/api/tasks/${taskId}`, 'PATCH', {
            ...editedTask,
            dueDate: editedTask.dueDate
               ? editedTask.dueDate.toISOString()
               : null,
         });
         await fetch(req);
      },

      onSuccess: () => {
         client.invalidateQueries({ queryKey: ['tasks'] });
      },
   });
};
