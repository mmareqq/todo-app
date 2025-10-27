import { useRef, useState } from 'react';
import AnimateExit from '@ui/AnimateExit';
import Button from '@ui/Button';
import Note from './Note/Note';
import { MenuIcon } from '@assets/Icons';

import { useNotesQuery } from './api/useNotesQuery';
import {
   useDeleteAllNotesMutation,
   useAddNoteMutation,
} from './api/noteMutations';
import { noteAddOffset } from '@frontend/data/data';
import type { NoteCreate } from '@types';

const StickyBoard = () => {
   const { data: notes = [] } = useNotesQuery();
   const { mutate: addNote } = useAddNoteMutation();
   const boardRef = useRef<HTMLDivElement | null>(null);

   const onAddNote = () => {
      if (!boardRef.current) return;
      const note: NoteCreate = {
         title: '',
         description: '',
         color: 'blue',
         x: boardRef.current.scrollLeft + noteAddOffset.x,
         y: boardRef.current.scrollTop + noteAddOffset.y,
         size: 'md',
      };
      addNote(note);
   };

   const toggleGrid = () => {
      boardRef.current?.classList.toggle('sticky-board--grid');
   };

   return (
      <div
         ref={boardRef}
         data-type="sticky-board"
         className="project sticky-board"
      >
         {notes.map(note => (
            <Note key={note.id} note={note} />
         ))}

         <div className="m-2 flex gap-2">
            <Menu toggleGrid={toggleGrid} />
            <Button variant="secondary" onClick={onAddNote}>
               Add note
            </Button>
         </div>
      </div>
   );
};

const Menu = ({ toggleGrid }: { toggleGrid: () => void }) => {
   const [menuOpen, setMenuOpen] = useState(false);
   const toggleMenu = () => setMenuOpen(p => !p);
   const { mutate: resetNotes } = useDeleteAllNotesMutation();

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
