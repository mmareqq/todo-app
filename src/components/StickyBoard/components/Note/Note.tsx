import useNoteDrag from './useNoteDrag';
import type { Note } from '@data/types';
import { DragIcon } from '@assets/Icons';

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
      zIndex: 2,
      ...styles,
   };

   return (
      <div
         ref={noteRef}
         data-type="note"
         className="bg-primary-800 overflow-hidden rounded-sm border select-none"
         style={dragging ? draggingStyles : styles}
      >
         <div
            data-type="drag-area"
            className="cursor-grab py-1.5 active:cursor-grabbing"
            style={{ backgroundColor: note.color }}
         ></div>
         <div className="flex gap-2 p-1">
            <h2>{note.title}</h2>
         </div>
         <p className="text-sm text-white/70">{note.description}</p>
      </div>
   );
};

export default Note;
