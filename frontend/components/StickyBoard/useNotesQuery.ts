import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Note, NoteCreate, NoteUpdate, Id } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';
import generateId from '@frontend/utils/generateId';

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

export const useDeleteAllNotesMutation = () => {
   const client = useQueryClient();

   return useMutation({
      mutationFn: async () => {
         try {
            const req = getFetchRequest('/api/notes', 'DELETE');
            await fetchJSON(req);
         } catch (err) {
            console.log('err deleting all notes', err);
         }
      },
      onSuccess: () => {
         client.invalidateQueries({ queryKey: ['notes'] });
      },
   });
};

export const useAddNoteMutation = () => {
   const client = useQueryClient();

   return useMutation({
      mutationFn: async (note: NoteCreate) => {
         const req = getFetchRequest('/api/notes', 'POST', note);
         await fetchJSON(req);
      },

      onSuccess: () => {
         client.invalidateQueries({ queryKey: ['notes'] });
      },
      onMutate: async newNote => {
         await client.cancelQueries({ queryKey: ['notes'] });

         const prevData = client.getQueryData(['notes']);

         client.setQueryData<Note[]>(['notes'], (old = []) => [
            ...old,
            { ...newNote, id: generateId() },
         ]);

         return { prevData };
      },
      onError: (err, newItem, onMutateResult) => {
         client.setQueryData(['notes'], onMutateResult!.prevData);
      },

      onSettled: () => client.invalidateQueries({ queryKey: ['notes'] }),
   });
};

export const useEditNoteMutation = (editedId: Id) => {
   const client = useQueryClient();
   return useMutation({
      mutationFn: async (noteUpdates: NoteUpdate) => {
         const req = getFetchRequest(
            `/api/notes/${editedId}`,
            'PATCH',
            noteUpdates,
         );
         await fetchJSON(req);
      },

      onMutate: async noteUpdates => {
         await client.cancelQueries({ queryKey: ['notes'] });

         const prevData = client.getQueryData(['notes']);

         client.setQueryData<Note[]>(['notes'], (old = []) =>
            old.map(note =>
               note.id === editedId ? { ...note, ...noteUpdates } : note,
            ),
         );

         return { prevData };
      },
      onError: (err, newItem, onMutateResult) => {
         client.setQueryData(['notes'], onMutateResult!.prevData);
      },
      onSettled: () => {
         client.invalidateQueries({ queryKey: ['notes'] });
      },
   });
};

export const useNoteDeleteMutation = (editedId: Id) => {
   const client = useQueryClient();

   return useMutation({
      mutationFn: async () => {
         const req = getFetchRequest(`/api/notes/${editedId}`, 'DELETE');
         await fetchJSON(req);
      },
      onMutate: async () => {
         await client.cancelQueries({ queryKey: ['notes'] });

         const prevData = client.getQueryData(['notes']);

         client.setQueryData<Note[]>(['notes'], (old = []) =>
            old.filter(note => note.id !== editedId),
         );

         return { prevData };
      },
      onError: (err, newItem, onMutateResult) => {
         client.setQueryData(['notes'], onMutateResult!.prevData);
      },
      onSettled: () => {
         client.invalidateQueries({ queryKey: ['notes'] });
      },
   });
};
