import useDialogContext from '@hooks/useDialogContext';
import useForm from '@hooks/useForm';

import TaskForm from '@components/TaskForm';
import Dialog from '@ui/Dialog';

function EditTaskDialog({ task, editTask }) {
   const { isOpen, closeDialog } = useDialogContext();
   const [formTask, updateValue, resetForm] = useForm(task);
   return (
      <Dialog
         isOpen={isOpen}
         closeDialog={closeDialog}
         onCancel={resetForm}
         onSuccess={() => editTask(task)}
      >
         <TaskForm task={formTask} updateValue={updateValue}>
            <TaskForm.NameInput />
            <TaskForm.PriorityInput />
            <TaskForm.DurationInput />
            <TaskForm.DateInput />
         </TaskForm>
      </Dialog>
   );
}

export default EditTaskDialog;
