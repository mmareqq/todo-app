import useForm from '@hooks/useForm';

import TaskForm from '@components/TaskForm';
import Dialog from '@ui/Dialog';
import type { TaskPayload, Task, TaskActions } from '@data/types';

type Props = {
   task: Task;
   editTask: TaskActions['editTask'];
};

const EditTaskDialog = ({ task, editTask }: Props) => {
   const taskPayload: TaskPayload = {
      name: task.name,
      priority: task.priority,
      duration: task.duration,
      date: task.date,
   };
   const [formTask, updateValue, resetForm] = useForm(taskPayload);

   const fullFormTask: Task = { ...task, ...formTask };
   return (
      <Dialog onCancel={resetForm} onSuccess={() => editTask(fullFormTask)}>
         <TaskForm task={formTask} updateValue={updateValue} />
      </Dialog>
   );
};

export default EditTaskDialog;
