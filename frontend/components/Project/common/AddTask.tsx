import DialogProvider from '@contexts/DialogProvider';
import useDialogContext from '@hooks/useDialogContext';
import Dialog from '@ui/Dialog';

import TaskForm from '@components/TaskForm';
import useForm from '@hooks/useForm';
import Button from '@ui/Button';
import { useAddTaskMutation } from './useAddTaskMutation';
import { taskModel } from '@frontend/data/data';
import type { Id } from '@types';

const AddTask = ({ projectId }: { projectId: Id }) => {
   const [taskPayload, updateValue, resetForm] = useForm(taskModel);
   const { mutate: addTask } = useAddTaskMutation();

   return (
      <DialogProvider>
         <AddButton />
         <Dialog
            onSuccess={() => {
               console.log('adding task with projectId ', projectId);
               addTask({ projectId, completed: false, ...taskPayload });
               resetForm();
            }}
         >
            <h2 className="mb-6 text-center text-xl">Create Task</h2>
            <TaskForm task={taskPayload} updateValue={updateValue} />
         </Dialog>
      </DialogProvider>
   );
};

const AddButton = () => {
   const { openDialog } = useDialogContext();
   return (
      <Button className="px-8" onClick={openDialog}>
         Add Task
      </Button>
   );
};

export default AddTask;
