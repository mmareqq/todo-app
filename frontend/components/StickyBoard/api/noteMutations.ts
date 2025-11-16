import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note, NoteCreate, NoteUpdate, Id } from '@types';
import { getFetchRequest, fetchJSON } from '@frontend/utils/fetch';
import generateId from '@frontend/utils/generateId';
import { useAuth } from '@clerk/clerk-react';

export const useAddNoteMutation = () => {
   const client = useQueryClient();
   const { getToken } = useAuth();
   return useMutation({
      mutationFn: async (note: NoteCreate) => {
         const token = await getToken();
         if (!token) throw new Error('Cannot generate token. Probably no user');
         const req = getFetchRequest('/api/notes', 'POST', token, note);
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
   const { getToken } = useAuth();
   return useMutation({
      mutationFn: async (noteUpdates: NoteUpdate) => {
         const token = await getToken();
         if (!token) throw new Error('Cannot generate token. Probably no user');
         const req = getFetchRequest(
            `/api/notes/${editedId}`,
            'PATCH',
            token,
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
   const { getToken } = useAuth();
   return useMutation({
      mutationFn: async () => {
         const token = await getToken();
         if (!token) throw new Error('Cannot generate token. Probably no user');
         const req = getFetchRequest(`/api/notes/${editedId}`, 'DELETE', token);
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
   const { getToken } = useAuth();

   return useMutation({
      mutationFn: async () => {
         const token = await getToken();
         if (!token) throw new Error('Cannot generate token. Probably no user');
         const req = getFetchRequest('/api/notes', 'DELETE', token);
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
