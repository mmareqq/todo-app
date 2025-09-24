import useDialogContext from '@hooks/useDialogContext';
import Button from '@ui/Button';
import { PlusIcon } from '@assets/Icons';

const ButtonAddProject = () => {
   const { openDialog } = useDialogContext();
   return (
      <Button variant="icon" onClick={openDialog}>
         <PlusIcon size={20} />
      </Button>
   );
};

export default ButtonAddProject;
