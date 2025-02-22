import { TrashIcon } from '../assets/Icons';
import Dialog from './Dialog';
import useDialog from '../hooks/useDialog';

export default function TrashButton({ remove, altText }) {
   const [isDialogOpen, openDialog, closeDialog] = useDialog();
   return (
      <>
         <button
            type="button"
            className="bg-opacity-50 my-2 mr-1 rounded-md p-1 transition-colors duration-150 hover:bg-white/8"
            onClick={openDialog}
         >
            <span className="sr-only">delete: {altText}</span>
            <TrashIcon />
         </button>
         <Dialog
            isOpen={isDialogOpen}
            closeDialog={closeDialog}
            onSuccess={remove}
         >
            <p>Delete {altText}?</p>
            <p>All data will be permanently deleted.</p>
         </Dialog>
      </>
   );
}
