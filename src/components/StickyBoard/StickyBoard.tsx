import useNotes from './useNotes';
import Note from './components/Note/Note';
import { exampleNote } from '@data/data';
import generateId from '@utils/generateId';
import { useRef } from 'react';

const noteSizes = {
   sm: { x: 100, y: 100 },
   md: { x: 200, y: 200 },
   lg: { x: 300, y: 300 },
   xl: { x: 400, y: 400 },
};

const StickyBoard = () => {
   const { notes, addNote, editNote, removeNote, setNotes } = useNotes();
   const boardRef = useRef<HTMLDivElement | null>(null);

   const addNewNote = (x: number, y: number) => {
      const newNote = {
         id: generateId(),
         title: 'Note 1',
         description: 'Exmaple note soomething pimpoeri',
         color: 'blue',
         x: boardRef.current!.scrollLeft + x,
         y: boardRef.current!.scrollTop + y,
         width: noteSizes.md.x,
         height: noteSizes.md.y,
      };
      addNote(newNote);
   };

   const resetNotes = () => setNotes([]);
   const onAddNote = () => addNewNote(225, 50);
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
         {!notes.length && (
            <div className="center-abs text-lg opacity-50">
               Click anywhere to add a note
               <button
                  className="cursor-pointer rounded-xl border px-5 py-0.5"
                  onClick={() => addNote(exampleNote)}
               >
                  Add example note
               </button>
            </div>
         )}
         <div className="mt-2 flex gap-2">
            <button
               type="button"
               className="cursor-pointer rounded-xl border px-5 py-0.5"
               onClick={resetNotes}
            >
               Reset
            </button>
            <button
               type="button"
               className="rounded-xl border px-5 py-0.5"
               onClick={onAddNote}
            >
               Add Note
            </button>
            <button
               type="button"
               className="rounded-xl border px-5 py-0.5"
               onClick={toggleGrid}
            >
               Use grid
            </button>
         </div>
      </div>
   );
};

export default StickyBoard;
