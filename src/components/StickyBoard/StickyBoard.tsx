import useNotes from './useNotes';
import Note from './components/Note/Note';
import { exampleNote } from '@data/data';
import generateId from '@utils/generateId';
import { useRef } from 'react';

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
         width: 100,
         height: 100,
      };
      addNote(newNote);
   };

   return (
      <div className="relative h-full">
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
            <button
               className="cursor-pointer rounded-xl border px-5 py-0.5"
               onClick={() => setNotes([])}
            >
               Reset
            </button>
            <button
               className="rounded-xl border px-5 py-0.5"
               onClick={() => addNewNote(200, 20)}
            >
               Add Note
            </button>
         </div>
      </div>
   );
};

export default StickyBoard;
