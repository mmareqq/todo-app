import { TrashIcon } from '../assets/Icons';
import Dialog from './Dialog';
import useDialog from '../hooks/useDialog';
import Button from './Button';

export default function TrashButton({ remove, altText }) {
   const [isDialogOpen, openDialog, closeDialog] = useDialog();
   return (
      <>
         <Button className="self-center" variant="square" onClick={openDialog}>
            <span className="sr-only">delete: {altText}</span>
            <TrashIcon />
         </Button>
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
