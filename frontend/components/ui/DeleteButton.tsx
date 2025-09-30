import { TrashIcon } from '@assets/Icons';
import useDialogContext from '@hooks/useDialogContext';
import DialogProvider from '@contexts/DialogProvider';

import Dialog from '@ui/Dialog';
import Button from '@ui/Button';

type Props = {
   onRemove: () => void;
   label: string;
   iconSize?: number;
};

const DeleteButton = ({ onRemove, label, iconSize = 20 }: Props) => {
   return (
      <DialogProvider>
         <DeleteButtonContent
            onRemove={onRemove}
            iconSize={iconSize}
            label={label}
         />
      </DialogProvider>
   );
};

const DeleteButtonContent = ({ onRemove, iconSize, label }: Props) => {
   const { openDialog } = useDialogContext();
   return (
      <>
         <Button
            className="self-center"
            variant="icon"
            onClick={openDialog}
            aria-label={`delete ${label}`}
         >
            <TrashIcon size={iconSize} />
         </Button>
         <Dialog onSuccess={onRemove}>
            <p>Delete {label}?</p>
            <p>All data will be permanently deleted.</p>
         </Dialog>
      </>
   );
};

export default DeleteButton;
