import { DragIcon } from '@assets/Icons';
import useNoteDrag from './useNoteDrag';
import type { Note } from '@data/types';

type Props = {
   note: Note;
   editNote: (newNote: Note) => void;
   removeNote: (id: Note['id']) => void;
};

const Note = ({ note, editNote, removeNote }: Props) => {
   const { noteRef, dragging } = useNoteDrag(note, editNote);

   const styles = {
      borderColor: note.color,
      height: note.height + 'px',
      width: note.width + 'px',
      left: note.x,
      top: note.y,
   };

   const draggingStyles = {
      boxShadow: '0 0 1.5rem #222',
      scale: '1.03',
      ...styles,
   };

   return (
      <div
         ref={noteRef}
         data-type="note"
         className="bg-primary-800 rounded-sm border p-1 select-none"
         style={dragging ? draggingStyles : styles}
      >
         <div className="flex gap-2">
            <div
               data-type="note-grab"
               className="cursor-grab active:cursor-grabbing"
            >
               <DragIcon
                  className="pointer-events-none text-white/70"
                  size={14}
               />
            </div>
            <h2>{note.title}</h2>
         </div>
         <p className="text-sm text-white/70">{note.description}</p>
      </div>
   );
};

export default Note;
