import Dialog from './Dialog';
import useDialog from '../hooks/useDialog';
import useForm from '../hooks/useForm';
import TaskForm from '../components/TaskForm';
import generateId from '../utils/generateId';
import Button from './Button';

export default function ButtonAddTask({ addTask }) {
   const [isOpen, openDialog, closeDialog] = useDialog();
   const [taskData, updateValue, resetForm] = useForm({
      name: '',
      priority: 0,
      duration: 0,
   });

   return (
      <>
         <Button onClick={openDialog}>Add task</Button>
         <Dialog
            isOpen={isOpen}
            closeDialog={closeDialog}
            onSuccess={() => {
               const task = {
                  id: generateId(),
                  finished: false,
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
