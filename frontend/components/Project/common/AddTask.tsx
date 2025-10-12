import DialogProvider from '@contexts/DialogProvider';
import useDialogContext from '@hooks/useDialogContext';
import Dialog from '@ui/Dialog';

import TaskForm from '@components/TaskForm';
import Button from '@ui/Button';
import useForm from '@hooks/useForm';
import { taskModel } from '@frontend/data/data';
import { useAddTaskMutation } from '../api/useAddTaskMutation';
import { getToday } from '@frontend/utils/time';
import { TaskPayload } from '@frontend/data/types';
import type { Id } from '@types';
const AddTask = ({ projectId }: { projectId: Id }) => {
   const initialTask: TaskPayload = { ...taskModel, dueDate: getToday() };
   const [taskPayload, updateValue, resetForm] = useForm(initialTask);
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
      <Button className="my-4 px-8" onClick={openDialog}>
         Add Task
      </Button>
   );
};

export default AddTask;
