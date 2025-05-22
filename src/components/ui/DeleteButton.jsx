import { TrashIcon } from '@assets/Icons';
import useDialogContext from '@hooks/useDialogContext';
import DialogProvider from '@contexts/DialogProvider';

import Dialog from '@ui/Dialog';
import Button from '@ui/Button';

function DeleteButton({ remove, children }) {
   return (
      <DialogProvider>
         <Wrapper>{children}</Wrapper>
         <TrashDialog remove={remove}>{children}</TrashDialog>
      </DialogProvider>
   );
}

function Wrapper({ children }) {
   const { openDialog } = useDialogContext();
   return (
      <Button className="self-center" variant="square" onClick={openDialog}>
         <span className="sr-only">delete: {children}</span>
         <TrashIcon size={24} />
      </Button>
   );
}

function TrashDialog({ remove, children }) {
   const { isOpen, closeDialog } = useDialogContext();
   return (
      <Dialog isOpen={isOpen} closeDialog={closeDialog} onSuccess={remove}>
         <p>Delete {children}?</p>
         <p>All data will be permanently deleted.</p>
      </Dialog>
   );
}

export default DeleteButton;
