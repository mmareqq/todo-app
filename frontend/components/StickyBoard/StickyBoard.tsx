import { useRef, useState } from 'react';
import type { Note as NoteType } from '@data/types';
import AnimateExit from '@ui/AnimateExit';

import useNotes from './useNotes';
import Note from './components/Note/Note';
import generateId from '@utils/generateId';
import Button from '@ui/Button';

import { MenuIcon } from '@assets/Icons';

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

   const resetNotes = () => setNotes([]);

   const toggleGrid = () => {
      boardRef.current!.classList.toggle('sticky-board--grid');
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
            <Menu toggleGrid={toggleGrid} resetNotes={resetNotes} />
            <Button variant="secondary" onClick={() => addNewNote(150, 50)}>
               Add note
            </Button>
         </div>
      </div>
   );
};

const Menu = ({
   toggleGrid,
   resetNotes,
}: {
   toggleGrid: () => void;
   resetNotes: () => void;
}) => {
   const [menuOpen, setMenuOpen] = useState(false);
   const toggleMenu = () => setMenuOpen(p => !p);

   return (
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
               className="border-none"
               onClick={() => {
                  toggleGrid();
                  toggleMenu();
               }}
            >
               Toggle grid
            </Button>
            <Button
               variant="dropdown"
               className="border-none"
               onClick={() => {
                  resetNotes();
                  toggleMenu();
               }}
            >
               Reset
            </Button>
         </AnimateExit>
      </div>
   );
};

export default StickyBoard;
