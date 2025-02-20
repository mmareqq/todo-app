import { TrashIcon } from '../assets/Icons';
import Dialog from './Dialog';
import { useState } from 'react';
export default function TrashButton({ remove, altText }) {
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   return (
      <>
         <button
            className="delete-btn bg-opacity-50 my-2 mr-1 rounded-md p-1 transition-colors duration-150 hover:bg-white/8"
            type="button"
            onClick={() => setIsDialogOpen(true)}
         >
            <span className="sr-only">delete: {altText}</span>
            <TrashIcon className="trash-icon"></TrashIcon>
         </button>
         <Dialog
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            onSuccess={remove}
         >
            <p>Delete {altText}?</p>
            <p>All tasks and info will be permanently deleted.</p>
         </Dialog>
      </>
   );
}
