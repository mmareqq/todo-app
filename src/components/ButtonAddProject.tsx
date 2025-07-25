import useDialogContext from '@hooks/useDialogContext';
import Button from '@ui/Button';

const ButtonAddProject = () => {
   const { openDialog } = useDialogContext();
   return <Button onClick={openDialog}>Add project</Button>;
};

export default ButtonAddProject;
