import { EditIcon } from '../assets/Icons';
import Dialog from './Dialog';
import useDialog from '../hooks/useDialog';
import useForm from '../hooks/useForm';
import TaskForm from './TaskForm';
import Button from './Button';

export default function EditButton({ editTask, task }) {
   const [isDialogOpen, openDialog, closeDialog] = useDialog();
   console.log(task.duration);
   const [data, updateValue, reset] = useForm(task);
   return (
      <>
         <Button variant="square" onClick={openDialog}>
            <span className="sr-only">open edit dialog: {task.name}</span>
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
