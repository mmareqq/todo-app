import useForm from '@hooks/useForm';
import generateId from '@utils/generateId';

import TaskForm from '@components/TaskForm/TaskForm';
import Dialog from '@ui/Dialog';
import { taskModel } from '@data/data';

import type { Task, TaskActions } from '@data/types';
type Props = Pick<TaskActions, 'addTask'>;

const AddTaskDialog = ({ addTask }: Props) => {
   const [task, updateValue, resetForm] = useForm(taskModel);
   type f = typeof updateValue;
   return (
      <Dialog
         onSuccess={() => {
            const newTask: Task = {
               id: generateId(),
               finished: false,
               createdAt: new Date().toISOString(),
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
