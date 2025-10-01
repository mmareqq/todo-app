import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { Id } from '@types';
import { getFetchRequest } from '@frontend/utils/fetch';
const useRemoveTaskMutation = (taskId: Id) => {
   const client = useQueryClient();

   return useMutation({
      mutationKey: ['removeTask'],
      mutationFn: async () => {
         const req = getFetchRequest(`/api/tasks/${taskId}`, 'DELETE');
         await fetch(req);
      },

      onSuccess: () => {
         client.invalidateQueries({ queryKey: ['tasks'] });
      },
   });
};

export default useRemoveTaskMutation;
