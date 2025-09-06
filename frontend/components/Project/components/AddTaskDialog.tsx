import useForm from '@hooks/useForm';
import generateId from '@utils/generateId';

import TaskForm from '@components/TaskForm';
import Dialog from '@ui/Dialog';
import { taskModel } from '@data/data';

import type { Task, TaskActions } from '@data/types';

type Props = {
   addTask: TaskActions['addTask'];
   projectId: string;
};

const AddTaskDialog = ({ addTask, projectId }: Props) => {
   const [task, updateValue, resetForm] = useForm(taskModel);
   return (
      <Dialog
         onSuccess={() => {
            const newTask: Task = {
               id: generateId(),
               projectId: projectId,
               completed: false,
               createdAt: new Date().toISOString(),
               ...task,
            };
            addTask(newTask);
            resetForm();
         }}
      >
         <h2 className="mb-6 text-center text-xl">Create Task</h2>
         <TaskForm task={task} updateValue={updateValue} />
      </Dialog>
   );
};

export default AddTaskDialog;
