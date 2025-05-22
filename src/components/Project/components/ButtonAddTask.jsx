import useDialogContext from '@hooks/useDialogContext';
import Button from '@ui/Button';

const ButtonAddTask = () => {
   const { openDialog } = useDialogContext();
   return <Button onClick={openDialog}>Add task</Button>;
};

export default ButtonAddTask;
