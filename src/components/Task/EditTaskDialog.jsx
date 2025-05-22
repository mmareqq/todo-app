import useDialogContext from '@hooks/useDialogContext';
import useForm from '@hooks/useForm';

import TaskForm from '@components/TaskForm';
import Dialog from '@ui/Dialog';

function EditTaskDialog({ task, editTask }) {
   const { isOpen, closeDialog } = useDialogContext();
   const [data, updateValue, resetForm] = useForm(task);
   return (
      <Dialog
         isOpen={isOpen}
         closeDialog={closeDialog}
         onCancel={resetForm}
         onSuccess={() => editTask(data)}
      >
         <TaskForm task={data} updateValue={updateValue} />
      </Dialog>
   );
}

export default EditTaskDialog;
