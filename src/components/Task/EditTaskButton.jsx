import { EditIcon } from '@assets/Icons';
import Dialog from '@ui/Dialog';
import useDialog from '@hooks/useDialog';
import useForm from '@hooks/useForm';
import TaskForm from '../TaskForm';
import Button from '@ui/Button';

export default function EditTaskButton({ editTask, task }) {
   const [isDialogOpen, openDialog, closeDialog] = useDialog();
   const [data, updateValue, reset] = useForm(task);
   return (
      <>
         <Button variant="square" onClick={openDialog}>
            <span className="sr-only">edit: {task.name}</span>
            <EditIcon></EditIcon>
         </Button>
         <Dialog
            isOpen={isDialogOpen}
            closeDialog={closeDialog}
            onCancel={reset}
            onSuccess={() => editTask(data)}
         >
            <TaskForm task={data} updateValue={updateValue} />
         </Dialog>
      </>
   );
}
