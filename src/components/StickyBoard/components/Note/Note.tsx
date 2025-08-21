import { useState } from 'react';
import useNoteDrag from './useNoteDrag';
import type { Note, NotePayload, NoteActions } from '@data/types';
import Button from '@ui/Button';
import { EditIcon, CheckMarkIcon } from '@assets/Icons';
import DeleteButton from '@ui/DeleteButton';

type Props = Pick<NoteActions, 'note' | 'editNote' | 'removeNote'>;

const Note = ({ note, editNote, removeNote }: Props) => {
   const { noteRef, dragging } = useNoteDrag(note, editNote);
   const [editing, setEditing] = useState(false);
   const enableEditing = () => setEditing(true);
   const disableEditing = () => setEditing(false);

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
         className="bg-primary-800 flex flex-col justify-between overflow-hidden rounded-sm border select-none"
         style={dragging ? draggingStyles : styles}
      >
         {editing ? (
            <NoteEditingBody
               note={note}
               editNote={editNote}
               removeNote={removeNote}
               disableEditing={disableEditing}
            />
         ) : (
            <NoteBody note={note} enableEditing={enableEditing} />
         )}
      </div>
   );
};

type NoteBodyProps = {
   note: Note;
   enableEditing: () => void;
};

const NoteBody = ({ note, enableEditing }: NoteBodyProps) => {
   return (
      <>
         <div
            data-type="drag-area"
            className="h-4 cursor-grab active:cursor-grabbing"
            style={{ backgroundColor: note.color }}
         ></div>
         <div className="mt-1 px-1.5">
            <h2>{note.title}</h2>
         </div>
         <div className="mt-1 h-full px-1.5">
            <p className="text-sm text-white/70">{note.description}</p>
         </div>
         <div className="flex justify-end p-1">
            <Button
               variant="square"
               className="cursor-pointer"
               onClick={enableEditing}
            >
               <EditIcon size={20} />
            </Button>
         </div>
      </>
   );
};

type EditingProps = Pick<NoteActions, 'note' | 'editNote' | 'removeNote'> & {
   disableEditing: () => void;
};

const NoteEditingBody = ({
   note,
   editNote,
   removeNote,
   disableEditing,
}: EditingProps) => {
   const [editedNote, setEditedNote] = useState({
      title: note.title,
      description: note.description,
   });

   const onConfirm = () => {
      editNote({ ...note, ...editedNote });
      disableEditing();
   };
   return (
      <>
         <div
            data-type="drag-area"
            className="h-4 cursor-grab active:cursor-grabbing"
            style={{ backgroundColor: note.color }}
         ></div>

         <div className="mt-1 px-1">
            <input
               autoFocus
               className="input outline-primary-500 focus:outline-primary-300 m-0 w-full px-0.5 outline-1 focus:outline-1"
               type="text"
               value={editedNote.title}
               onChange={e =>
                  setEditedNote(p => ({
                     ...p,
                     title: e.target.value,
                  }))
               }
            />
         </div>
         <div className="mt-1 block h-full px-1">
            <textarea
               spellCheck={false}
               className="textarea bg-primary-800 border-primary-700 outline-primary-500 text-primary-300 focus:outline-primary-300 px-0.5 text-sm outline-1"
               value={editedNote.description}
               onChange={e => {
                  setEditedNote(p => ({
                     ...p,
                     description: e.target.value,
                  }));
               }}
            ></textarea>
         </div>
         <div className="flex items-center justify-end gap-1 p-1">
            <DeleteButton iconSize={20} onRemove={() => removeNote(note.id)}>
               {note.title} note
            </DeleteButton>

            <Button variant="square" onClick={onConfirm}>
               <CheckMarkIcon />
            </Button>
         </div>
      </>
   );
};
export default Note;
