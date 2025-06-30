import { EditIcon } from '@assets/Icons';
import Button from '@ui/Button';
import useDialogContext from '@hooks/useDialogContext';

import type { Children } from '@data/types';

const EditTaskButton = ({ children }: Children) => {
   const { openDialog } = useDialogContext();
   return (
      <Button variant="square" onClick={openDialog}>
         <span className="sr-only">edit: {children}</span>
         <EditIcon size={24} />
      </Button>
   );
};

export default EditTaskButton;
