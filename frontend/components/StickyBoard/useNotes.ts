import { useState, useEffect } from 'react';

import type { Note } from '@frontend/data/types';

const getNotes = (): Note[] => {
   const notes = localStorage.getItem('notes');
   return notes ? JSON.parse(notes) : [];
};

const useNotes = () => {
   const [notes, setNotes] = useState(getNotes);

   const editNote = (newNote: Note) => {
      setNotes(p => p.map(note => (note.id === newNote.id ? newNote : note)));
   };

   const removeNote = (noteId: Note['id']) => {
      setNotes(p => p.filter(note => note.id !== noteId));
   };

   const addNote = (newNote: Note) => {
      setNotes(p => [...p, newNote]);
   };

   useEffect(() => {
      localStorage.setItem('notes', JSON.stringify(notes));
   });

   return { notes, addNote, removeNote, editNote, setNotes };
};

export default useNotes;
