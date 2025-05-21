import useDialog from '@hooks/useDialog';
import useForm from '@hooks/useForm';
import generateId from '@utils/generateId';

import TaskForm from '@components/TaskForm';
import Dialog from '@ui/Dialog';
import Button from '@ui/Button';

import { taskModel } from '@data/data';

export default function ButtonAddTask({ addTask }) {
   const [isDialogOpen, openDialog, closeDialog] = useDialog();
   const [taskData, updateValue, resetForm] = useForm(taskModel);

   return (
      <>
         <Button onClick={openDialog}>Add task</Button>
         <Dialog
            isOpen={isDialogOpen}
            closeDialog={closeDialog}
            onSuccess={() => {
               const task = {
                  id: generateId(),
                  finished: false,
                  createdAt: new Date(),
                  ...taskData,
               };
               addTask(task);
               resetForm();
            }}
         >
            <h2 className="mb-6 text-center text-xl">Create Task</h2>
            <TaskForm task={taskData} updateValue={updateValue} />
         </Dialog>
      </>
   );
}
