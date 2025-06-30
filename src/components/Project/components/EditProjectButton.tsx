import useDialogContext from '@hooks/useDialogContext';
import { EditIcon } from '@assets/Icons';

import Button from '@ui/Button';

type Props = { label: string };

const EditProjectButton = ({ label }: Props) => {
   const { openDialog } = useDialogContext();

   return (
      <Button variant="square" onClick={openDialog}>
         <span className="sr-only">{label}</span>
         <EditIcon />
      </Button>
   );
};

export default EditProjectButton;
