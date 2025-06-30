import { TrashIcon } from '@assets/Icons';
import useDialogContext from '@hooks/useDialogContext';
import DialogProvider from '@contexts/DialogProvider';

import Dialog from '@ui/Dialog';
import Button from '@ui/Button';

import type { Children } from '@data/types';

type Props = {
   remove: () => void;
} & Children;

const DeleteButton = ({ remove, children }: Props) => {
   return (
      <DialogProvider>
         <DeleteButtonContent remove={remove}>{children}</DeleteButtonContent>
      </DialogProvider>
   );
};

const DeleteButtonContent = ({ remove, children }: Props) => {
   const { openDialog } = useDialogContext();
   return (
      <>
         <Button className="self-center" variant="square" onClick={openDialog}>
            <span className="sr-only">delete: {children}</span>
            <TrashIcon size={24} />
         </Button>
         <Dialog onSuccess={remove}>
            <p>Delete {children}?</p>
            <p>All data will be permanently deleted.</p>
         </Dialog>
      </>
   );
};

export default DeleteButton;
