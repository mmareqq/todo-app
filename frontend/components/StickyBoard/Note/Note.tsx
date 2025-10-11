import { useState } from 'react';
import useNoteDrag from './useNoteDrag';
import type { Note } from '@frontend/data/types';

import { noteColors, noteSizes } from '@frontend/data/data';

import NoteBody from './NoteBody';
import EditingNoteBody from './EditingNoteBody';
import { useEditNoteMutation } from '../useNotesQuery';
import { debounce } from '@shared/data/utils/debounce';

const useEditingState = () => {
   const [editing, setEditing] = useState(false);
   const enableEditing = () => setEditing(true);
   const disableEditing = () => setEditing(false);

   return [editing, enableEditing, disableEditing] as const;
};

const Note = ({ note }: { note: Note }) => {
   const { mutate: editNote } = useEditNoteMutation(note.id);
   const { noteRef, dragging } = useNoteDrag(note, debounce(editNote, 1000));
   const [editing, enableEditing, disableEditing] = useEditingState();

   const styles = {
      width: noteSizes[note.size].w + 'px',
      height: noteSizes[note.size].h + 'px',
      left: note.x,
      top: note.y,
      borderColor: noteColors[note.color],
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
         className="bg-primary-800 absolute rounded-t-lg border"
         style={dragging ? draggingStyles : styles}
      >
         <div
            data-type="drag-area"
            className="h-3 cursor-grab rounded-t-md active:cursor-grabbing"
            style={{ backgroundColor: noteColors[note.color] }}
         />
         <div className="flex h-full flex-col justify-between pb-3">
            {editing ? (
               <EditingNoteBody note={note} disableEditing={disableEditing} />
            ) : (
               <NoteBody note={note} enableEditing={enableEditing} />
            )}
         </div>
      </div>
   );
};

export default Note;
