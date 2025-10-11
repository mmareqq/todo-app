import type { Note } from '@frontend/data/types';
import Button from '@ui/Button';

import { EditIcon } from '@assets/Icons';

type NoteBodyProps = {
   note: Note;
   enableEditing: () => void;
};

const NoteBody = ({ note, enableEditing }: NoteBodyProps) => {
   return (
      <>
         <div className="mt-1 px-1.5">
            <h2>{note.title}</h2>
         </div>
         <div className="mt-1 h-full px-1.5">
            <p className="h-full text-sm wrap-break-word whitespace-pre-line text-white/70">
               {note.description}
            </p>
         </div>
         <div className="flex justify-end p-1">
            <Button
               variant="icon"
               className="cursor-pointer"
               onClick={enableEditing}
            >
               <EditIcon />
            </Button>
         </div>
      </>
   );
};

export default NoteBody;
