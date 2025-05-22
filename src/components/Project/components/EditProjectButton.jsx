import useDialogContext from '@hooks/useDialogContext';
import { EditIcon } from '@assets/Icons';

import Button from '@ui/Button';

function EditProjectButton({ children }) {
   const { openDialog } = useDialogContext();

   return (
      <Button variant="square" onClick={openDialog}>
         <span className="sr-only">open edit dialog: {children}</span>
         <EditIcon />
      </Button>
   );
}

export default EditProjectButton;
