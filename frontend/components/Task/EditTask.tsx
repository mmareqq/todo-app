import DialogProvider from '@contexts/DialogProvider';
import useDialogContext from '@hooks/useDialogContext';
import Dialog from '@ui/Dialog';
import { EditIcon } from '@assets/Icons';
import Button from '@ui/Button';
import useForm from '@hooks/useForm';

import TaskForm from '@components/TaskForm';
import type { Task, TaskPayload } from '@frontend/data/types';
import { useEditTaskMutation } from './api/useEditTaskMutation';

const EditTask = ({ task }: { task: Task }) => {
   const taskPayload: TaskPayload = {
      name: task.name,
      priority: task.priority,
      duration: task.duration,
      dueDate: task.dueDate,
   };
   const { data: formTask, updateValue, resetForm } = useForm(taskPayload);

   const { mutate: editTask } = useEditTaskMutation(task);

   return (
      <DialogProvider>
         <EditTaskButton label={task.name} />
         <Dialog
            onSuccess={() => editTask({ ...task, ...formTask })}
            onCancel={resetForm}
         >
            <TaskForm task={formTask} updateValue={updateValue} />
         </Dialog>
      </DialogProvider>
   );
};

const EditTaskButton = ({ label }: { label: string }) => {
   const { openDialog } = useDialogContext();
   return (
      <Button variant="icon" onClick={openDialog} aria-label={`edit ${label}`}>
         <EditIcon />
      </Button>
   );
};

export default EditTask;
