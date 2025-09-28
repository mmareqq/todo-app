import Button from '@ui/Button';
import useDialogContext from '@hooks/useDialogContext';

const AddButton = ({ label }: { label: string }) => {
   const { openDialog } = useDialogContext();
   return <Button onClick={openDialog}>{label}</Button>;
};

export default AddButton;
