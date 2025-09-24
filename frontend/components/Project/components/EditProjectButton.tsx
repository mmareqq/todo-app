import useDialogContext from '@hooks/useDialogContext';
import { EditIcon } from '@assets/Icons';

import Button from '@ui/Button';

type Props = { label: string };

const EditProjectButton = ({ label }: Props) => {
   const { openDialog } = useDialogContext();

   return (
      <Button variant="icon" onClick={openDialog} aria-label={`edit ${label}`}>
         <EditIcon size={20} />
      </Button>
   );
};

export default EditProjectButton;
