import { useQuery } from '@tanstack/react-query';
import type { Note } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';

export const useNotesQuery = () => {
   return useQuery<Note[]>({
      queryKey: ['notes'],
      queryFn: async () => {
         try {
            const req = getFetchRequest(`/api/notes`, 'GET');
            const json = await fetchJSON(req);
            return json;
         } catch (err) {
            console.error('err in useNotesQuery:', err);
         }
      },
   });
};
