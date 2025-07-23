import { useState, useEffect } from 'react';

import type { Note } from '@data/types';

const getNotes = (): Note[] => {
   const notes = localStorage.getItem('notes');
   return notes ? JSON.parse(notes) : [];
};

const useNotes = () => {
   const [notes, setNotes] = useState(getNotes);

   useEffect(() => {
      localStorage.setItem('notes', JSON.stringify(notes));
   });

   return { notes, setNotes };
};

export default useNotes;
