import useNotes from './useNotes';
import Note from './components/Note';
import { exampleNote } from '@data/data';

const StickyBoard = () => {
   const { notes, setNotes } = useNotes();

   const addExample = () => setNotes([exampleNote]);

   const handleClick = () => {
      addExample();
   };

   return (
      <div
         className="relative h-full w-full border-1 outline"
         onClick={handleClick}
      >
         {notes.map((note) => (
            <Note key={note.id} note={note} />
         ))}
         {!notes.length && (
            <div className="center-abs -z-1 text-lg opacity-50">
               Click anywhere to add a note
            </div>
         )}
      </div>
   );
};

export default StickyBoard;
