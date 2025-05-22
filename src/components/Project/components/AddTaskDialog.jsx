import useForm from '@hooks/useForm';
import useDialogContext from '@hooks/useDialogContext';
import generateId from '@utils/generateId';

import TaskForm from '@components/TaskForm';
import Dialog from '@ui/Dialog';
import { taskModel } from '@data/data';

const AddTaskDialog = ({ addTask }) => {
   const { isOpen, closeDialog } = useDialogContext();
   const [task, updateValue, resetForm] = useForm(taskModel);
   return (
      <Dialog
         isOpen={isOpen}
         closeDialog={closeDialog}
         onSuccess={() => {
            const newTask = {
               id: generateId(),
               finished: false,
               createdAt: new Date(),
               ...task,
            };
            addTask(newTask);
            resetForm();
         }}
      >
         <h2 className="mb-6 text-center text-xl">Create Task</h2>
         <TaskForm task={task} updateValue={updateValue}>
            <TaskForm.NameInput />
            <TaskForm.PriorityInput />
            <TaskForm.DurationInput />
            <TaskForm.DateInput />
         </TaskForm>
      </Dialog>
   );
};

export default AddTaskDialog;
