import useForm from '@hooks/useForm';

import TaskForm from '@components/TaskForm';
import Dialog from '@ui/Dialog';
import type { TaskPayload, Task, TaskActions } from '@frontend/data/types';

type Props = {
   task: Task;
   editTask: TaskActions['editTask'];
};

const EditTaskDialog = ({ task, editTask }: Props) => {
   const taskPayload: TaskPayload = {
      name: task.name,
      priority: task.priority,
      duration: task.duration,
      dueDate: task.dueDate,
   };
   const [formTask, updateValue, resetForm] = useForm(taskPayload);

   return (
      <Dialog
         onSuccess={() => editTask({ ...task, ...formTask })}
         onCancel={resetForm}
      >
         <TaskForm task={formTask} updateValue={updateValue} />
      </Dialog>
   );
};

export default EditTaskDialog;
