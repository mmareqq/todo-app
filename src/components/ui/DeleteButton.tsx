import { TrashIcon } from '@assets/Icons';
import useDialogContext from '@hooks/useDialogContext';
import DialogProvider from '@contexts/DialogProvider';

import Dialog from '@ui/Dialog';
import Button from '@ui/Button';

import type { Children } from '@data/types';

type Props = {
   onRemove: () => void;
} & Children;

const DeleteButton = ({ onRemove, children }: Props) => {
   return (
      <DialogProvider>
         <DeleteButtonContent onRemove={onRemove}>
            {children}
         </DeleteButtonContent>
      </DialogProvider>
   );
};

const DeleteButtonContent = ({ onRemove, children }: Props) => {
   const { openDialog } = useDialogContext();
   return (
      <>
         <Button className="self-center" variant="square" onClick={openDialog}>
            <span className="sr-only">delete: {children}</span>
            <TrashIcon size={24} />
         </Button>
         <Dialog onSuccess={onRemove}>
            <p>Delete {children}?</p>
            <p>All data will be permanently deleted.</p>
         </Dialog>
      </>
   );
};

export default DeleteButton;
