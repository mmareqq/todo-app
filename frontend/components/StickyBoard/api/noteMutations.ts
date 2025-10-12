import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note, NoteCreate, NoteUpdate, Id } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';
import generateId from '@frontend/utils/generateId';

export const useAddNoteMutation = () => {
   const client = useQueryClient();

   return useMutation({
      mutationFn: async (note: NoteCreate) => {
         const req = getFetchRequest('/api/notes', 'POST', note);
         await fetchJSON(req);
      },

      onMutate: async newNote => {
         await client.cancelQueries({ queryKey: ['notes'] });

         const prevNotes = client.getQueryData(['notes']);

         client.setQueryData<Note[]>(['notes'], (old = []) => [
            ...old,
            { ...newNote, id: generateId() },
         ]);

         return { prevNotes };
      },
      onError: (err, newNote, context) => {
         if (context?.prevNotes) {
            client.setQueryData(['notes'], context.prevNotes);
         }
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

         const prevNotes = client.getQueryData(['notes']);

         client.setQueryData<Note[]>(['notes'], (old = []) =>
            old.map(note =>
               note.id === editedId ? { ...note, ...noteUpdates } : note,
            ),
         );

         return { prevNotes };
      },
      onError: (err, newNote, context) => {
         if (context?.prevNotes) {
            client.setQueryData(['notes'], context.prevNotes);
         }
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

         const prevNotes = client.getQueryData(['notes']);

         client.setQueryData<Note[]>(['notes'], (old = []) =>
            old.filter(note => note.id !== editedId),
         );

         return { prevNotes };
      },
      onError: (err, _, context) => {
         if (context?.prevNotes) {
            client.setQueryData(['notes'], context.prevNotes);
         }
      },
      onSettled: () => {
         client.invalidateQueries({ queryKey: ['notes'] });
      },
   });
};

export const useDeleteAllNotesMutation = () => {
   const client = useQueryClient();

   return useMutation({
      mutationFn: async () => {
         const req = getFetchRequest('/api/notes', 'DELETE');
         await fetchJSON(req);
      },

      onMutate: async () => {
         await client.cancelQueries({ queryKey: ['notes'] });

         const prevNotes = client.getQueryData(['notes']);
         client.setQueryData(['notes'], []);

         return { prevNotes };
      },
      onError: (err, _, context) => {
         if (context?.prevNotes) {
            client.setQueryData(['notes'], context.prevNotes);
         }
      },
      onSettled: () => {
         client.invalidateQueries({ queryKey: ['notes'] });
      },
   });
};
