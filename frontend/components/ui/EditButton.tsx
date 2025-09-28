import useDialogContext from '@hooks/useDialogContext';
import Button from '@ui/Button';
import { EditIcon } from '@assets/Icons';

type Props = {
   label: string;
   iconSize?: number;
};
const EditButton = ({ label, iconSize = 20 }: Props) => {
   const { openDialog } = useDialogContext();

   return (
      <Button variant="icon" onClick={openDialog} aria-label={`edit ${label}`}>
         <EditIcon size={iconSize} />
      </Button>
   );
};

export default EditButton;
