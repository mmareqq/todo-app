import useForm from '@hooks/useForm';
import useDialogContext from '@hooks/useDialogContext';
import generateId from '@utils/generateId';

import TaskForm from '@components/TaskForm';
import Dialog from '@ui/Dialog';
import { taskModel } from '@data/data';

const AddTaskDialog = ({ addTask }) => {
   const { isOpen, closeDialog } = useDialogContext();
   const [taskData, updateValue, resetForm] = useForm(taskModel);
   return (
      <Dialog
         isOpen={isOpen}
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
   );
};

export default AddTaskDialog;
