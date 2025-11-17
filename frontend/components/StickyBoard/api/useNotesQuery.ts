import { useQuery } from '@tanstack/react-query';
import type { Note } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';
import { useAuth } from '@clerk/clerk-react';

export const useNotesQuery = () => {
   const { getToken } = useAuth();
   return useQuery({
      queryKey: ['notes'],
      queryFn: async () => {
         const token = await getToken();
         if (!token) throw new Error('Cannot generate token. Probably no user');
         const req = getFetchRequest(`/api/notes`, 'GET', token);
         const json = await fetchJSON(req);

         return json as Note[];
      },
   });
};
