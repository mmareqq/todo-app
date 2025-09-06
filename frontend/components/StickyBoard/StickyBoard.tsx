import useNotes from './useNotes';
import Note from './components/Note/Note';
import generateId from '@utils/generateId';
import { useRef, useState } from 'react';
import { noteSizes } from '@data/data';
import type { Note as NoteType } from '@data/types';
import Button from '@ui/Button';

import { MenuIcon } from '@assets/Icons';

import AnimateExit from '@ui/AnimateExit';

const StickyBoard = () => {
   const { notes, addNote, editNote, removeNote, setNotes } = useNotes();
   const boardRef = useRef<HTMLDivElement | null>(null);

   const addNewNote = (x: number, y: number) => {
      const newNote: NoteType = {
         id: generateId(),
         title: '',
         description: '',
         color: 'blue',
         x: boardRef.current!.scrollLeft + x,
         y: boardRef.current!.scrollTop + y,
         size: 'md',
      };
      addNote(newNote);
   };

   const [menuOpen, setMenuOpen] = useState(false);

   const toggleMenu = () => setMenuOpen(p => !p);

   const resetNotes = () => {
      setNotes([]);
      toggleMenu();
   };

   const toggleGrid = () => {
      boardRef.current!.classList.toggle('sticky-board--grid');
      toggleMenu();
   };

   return (
      <div ref={boardRef} data-type="sticky-board" className="sticky-board">
         {notes.map(note => (
            <Note
               key={note.id}
               note={note}
               editNote={editNote}
               removeNote={removeNote}
            />
         ))}

         <div className="m-2 flex gap-2">
            <div>
               <Button variant="dropdown" className="p-1" onClick={toggleMenu}>
                  <MenuIcon />
               </Button>
               <AnimateExit
                  hidden={menuOpen}
                  className="bg-primary-800 border-primary-600 absolute flex origin-top flex-col overflow-hidden rounded-md border"
               >
                  <Button
                     variant="dropdown"
                     className="rounded-none border-none"
                     onClick={toggleGrid}
                  >
                     Toggle grid
                  </Button>
                  <Button
                     variant="dropdown"
                     className="border-none"
                     onClick={resetNotes}
                  >
                     Reset
                  </Button>
               </AnimateExit>
            </div>
            <div>
               <Button variant="secondary" onClick={() => addNewNote(150, 50)}>
                  Add note
               </Button>
            </div>
         </div>
      </div>
   );
};

export default StickyBoard;
