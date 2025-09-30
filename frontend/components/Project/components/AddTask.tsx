import DialogProvider from '@contexts/DialogProvider';
import type { Id } from '@types';

import useForm from '@hooks/useForm';
import TaskForm from '@components/TaskForm';
import Dialog from '@ui/Dialog';
import { taskModel } from '@frontend/data/data';
import Button from '@ui/Button';
import { useAddTaskMutation } from '../queries';
import useDialogContext from '@hooks/useDialogContext';

const AddTask = ({ projectId }: { projectId: Id }) => {
   const [taskPayload, updateValue, resetForm] = useForm(taskModel);
   const { mutate: addTask } = useAddTaskMutation();

   return (
      <DialogProvider>
         <AddButton />
         <Dialog
            onSuccess={() => {
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
