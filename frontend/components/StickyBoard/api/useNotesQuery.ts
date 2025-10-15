import { useQuery } from '@tanstack/react-query';
import type { Note } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';

export const useNotesQuery = () => {
   return useQuery({
      queryKey: ['notes'],
      queryFn: async (): Promise<Note[]> => {
         const req = getFetchRequest(`/api/notes`, 'GET');
         const json = await fetchJSON(req);
         return json;
      },
   });
};
