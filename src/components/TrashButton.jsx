import { TrashIcon } from '../assets/Icons';
import Dialog from './Dialog';
import useDialog from '../hooks/useDialog';

export default function TrashButton({ remove, altText }) {
   const [isDialogOpen, openDialog, closeDialog] = useDialog();
   return (
      <>
         <button
            className="delete-btn bg-opacity-50 my-2 mr-1 rounded-md p-1 transition-colors duration-150 hover:bg-white/8"
            type="button"
            onClick={openDialog}
         >
            <span className="sr-only">delete: {altText}</span>
            <TrashIcon className="trash-icon"></TrashIcon>
         </button>
         <Dialog
            isOpen={isDialogOpen}
            closeDialog={closeDialog}
            onSuccess={remove}
         >
            <p>Delete {altText}?</p>
            <p>All tasks and info will be permanently deleted.</p>
         </Dialog>
      </>
   );
}
