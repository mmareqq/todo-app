import useForm from '@hooks/useForm';

import TaskForm from '@components/TaskForm';
import Dialog from '@ui/Dialog';

function EditTaskDialog({ task, editTask }) {
   const [formTask, updateValue, resetForm] = useForm(task);
   return (
      <Dialog onCancel={resetForm} onSuccess={() => editTask(formTask)}>
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
