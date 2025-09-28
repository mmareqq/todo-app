import { useState } from 'react';
import type {
   NotePayload,
   NoteActions,
   NoteColor,
   NoteSize,
} from '@frontend/data/types';

import { CheckMarkIcon } from '@assets/Icons';
import Button from '@ui/Button';
import DeleteButton from '@ui/DeleteButton';

import SizeMenu from './SizeMenu';
import ColorPicker from './ColorPicker';

type EditingProps = Pick<NoteActions, 'note' | 'editNote' | 'removeNote'> & {
   disableEditing: () => void;
};

const useEditingNote = (note: NotePayload) => {
   const [editedNote, setEditedNote] = useState<NotePayload>({
      title: note.title,
      description: note.description,
   });

   const editProperty = (property: keyof NotePayload, value: string) => {
      setEditedNote(n => ({
         ...n,
         [property]: value,
      }));
   };
   return [editedNote, editProperty] as const;
};

const EditingNoteBody = ({
   note,
   editNote,
   removeNote,
   disableEditing,
}: EditingProps) => {
   const [editedNote, editProperty] = useEditingNote(note);

   return (
      <>
         <div className="mt-1 px-1">
            <input
               autoFocus
               className="input outline-primary-500 focus:outline-primary-300 m-0 w-full px-0.5 outline-1 focus:outline-1"
               type="text"
               id="noteTitle"
               name="noteTitle"
               placeholder="Title"
               value={editedNote.title}
               onChange={e => editProperty('title', e.target.value)}
            />
         </div>
         <div className="mt-1 block h-full px-1">
            <textarea
               spellCheck={false}
               id="noteDescription"
               name="noteDescription"
               className="textarea bg-primary-800 border-primary-700 outline-primary-500 text-primary-300 focus:outline-primary-300 px-0.5 text-sm outline-1"
               value={editedNote.description}
               onChange={e => editProperty('description', e.target.value)}
               placeholder="description..."
            />
         </div>
         <ColorPicker
            selectedColor={note.color}
            editNoteColor={(color: NoteColor) => {
               editNote({ ...note, color: color });
            }}
         />

         <div className="flex items-center justify-between p-1">
            <SizeMenu
               editNoteSize={(size: NoteSize) => {
                  editNote({
                     ...note,
                     size: size,
                  });
               }}
               isBtnActive={(size: NoteSize) => note.size === size}
            />
            <div className="flex">
               <DeleteButton
                  onRemove={() => removeNote(note.id)}
                  label={note.title}
                  iconSize={20}
               />
               <Button
                  variant="icon"
                  onClick={() => {
                     editNote({ ...note, ...editedNote });
                     disableEditing();
                  }}
               >
                  <CheckMarkIcon />
               </Button>
            </div>
         </div>
      </>
   );
};

export default EditingNoteBody;
