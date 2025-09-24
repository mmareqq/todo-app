import { EditIcon } from '@assets/Icons';
import Button from '@ui/Button';
import useDialogContext from '@hooks/useDialogContext';

const EditTaskButton = ({ label }: { label: string }) => {
   const { openDialog } = useDialogContext();
   return (
      <Button variant="icon" onClick={openDialog} aria-label={`edit ${label}`}>
         <EditIcon />
      </Button>
   );
};

export default EditTaskButton;
