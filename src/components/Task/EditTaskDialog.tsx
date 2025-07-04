import useForm from '@hooks/useForm';

import TaskForm from '@components/TaskForm/TaskForm';
import Dialog from '@ui/Dialog';
import type { Task } from '@data/types';

type Props = {
   task: Task;
   editTask: (newTask: Task) => void;
};

const EditTaskDialog = ({ task, editTask }: Props) => {
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
};

export default EditTaskDialog;
