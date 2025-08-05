import useNotes from './useNotes';
import Note from './components/Note';
import { exampleNote } from '@data/data';
import generateId from '@utils/generateId';

const StickyBoard = () => {
   const { notes, addNote, editNote, removeNote, setNotes } = useNotes();

   const addNewNote = (x: number, y: number) => {
      const newNote = {
         id: generateId(),
         title: 'Note 1',
         description: 'Exmaple note soomething pimpoeri',
         color: 'blue',
         x: x,
         y: y,
         width: 100,
         height: 100,
      };
      addNote(newNote);
   };

   const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (notes.length) return;
      // mouse position including navbar offset
      addNewNote(e.clientX - 207, e.clientY);
   };

   return (
      <div
         data-type="sticky-board"
         onClick={handleClick}
         className="sticky-board relative h-full w-full overflow-hidden"
      >
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
      </div>
   );
};

export default StickyBoard;
