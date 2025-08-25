import { TrashIcon } from '@assets/Icons';
import useDialogContext from '@hooks/useDialogContext';
import DialogProvider from '@contexts/DialogProvider';

import Dialog from '@ui/Dialog';
import Button from '@ui/Button';

import type { Children } from '@data/types';

type Props = {
   onRemove: () => void;
   iconSize?: number;
} & Children;

const DeleteButton = ({ onRemove, iconSize = 24, children }: Props) => {
   return (
      <DialogProvider>
         <DeleteButtonContent onRemove={onRemove} iconSize={iconSize}>
            {children}
         </DeleteButtonContent>
      </DialogProvider>
   );
};

const DeleteButtonContent = ({ onRemove, iconSize, children }: Props) => {
   const { openDialog } = useDialogContext();
   return (
      <>
         <Button className="self-center" variant="icon" onClick={openDialog}>
            <span className="sr-only">delete: {children}</span>
            <TrashIcon size={iconSize} />
         </Button>
         <Dialog onSuccess={onRemove}>
            <p>Delete {children}?</p>
            <p>All data will be permanently deleted.</p>
         </Dialog>
      </>
   );
};

export default DeleteButton;
