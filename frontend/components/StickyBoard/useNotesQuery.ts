import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Note, NoteCreate, NoteUpdate, Id } from '@types';
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
         try {
            const req = getFetchRequest('/api/notes', 'POST', note);
            await fetchJSON(req);
         } catch (err) {
            console.log('err deleting all notes', err);
         }
      },
      onSuccess: () => {
         client.invalidateQueries({ queryKey: ['notes'] });
      },
      onMutate: async (newNote, context) => {
         await context.client.cancelQueries({ queryKey: ['notes'] });

         const prevNotes = context.client.getQueryData(['todos']);

         context.client.setQueryData(['notes'], (old: Note[]) => [
            ...old,
            newNote,
         ]);

         return { prevNotes };
      },

      onError: (err, newTodo, onMutateResult, context) => {
         context.client.setQueryData(['todos'], onMutateResult!.prevNotes);
      },

      onSettled: (data, error, variables, onMutateResult, context) =>
         context.client.invalidateQueries({ queryKey: ['todos'] }),
   });
};

export const useEditNoteMutation = (noteId: Id) => {
   const client = useQueryClient();
   return useMutation({
      mutationFn: async (noteUpdates: NoteUpdate) => {
         try {
            console.log('noteUpdates', noteUpdates);
            const req = getFetchRequest(
               `/api/notes/${noteId}`,
               'PATCH',
               noteUpdates,
            );
            await fetchJSON(req);
         } catch (err) {
            console.log(`err editing ${noteId} note`, err);
         }
      },
      onSuccess: () => {
         client.invalidateQueries({ queryKey: ['notes'] });
      },
   });
};

export const useNoteDeleteMutation = (noteId: Id) => {
   const client = useQueryClient();

   return useMutation({
      mutationFn: async () => {
         try {
            const req = getFetchRequest(`/api/notes/${noteId}`, 'DELETE');
            await fetchJSON(req);
         } catch (err) {
            console.log(`err deleting ${noteId} note`, err);
         }
      },
      onSuccess: () => {
         client.invalidateQueries({ queryKey: ['notes'] });
      },
   });
};
