import DialogProvider from '@contexts/DialogProvider';
import type { Id } from '@types';

import useForm from '@hooks/useForm';
import AddButton from '@ui/AddButton';
import TaskForm from '@components/TaskForm';
import Dialog from '@ui/Dialog';
import { taskModel } from '@frontend/data/data';

import { useAddTaskMutation } from '../queries';

const AddTask = ({ projectId }: { projectId: Id }) => {
   const [taskPayload, updateValue, resetForm] = useForm(taskModel);
   const { mutate: addTask } = useAddTaskMutation();

   return (
      <DialogProvider>
         <AddButton label="Add task" />
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

export default AddTask;
