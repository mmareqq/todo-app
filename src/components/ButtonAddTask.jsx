import Dialog from './Dialog';
import useDialog from '../hooks/useDialog';
import useForm from '../hooks/useForm';
import TaskForm from '../components/TaskForm';
import generateId from '../utils/generateId';

export default function ButtonAddTask({ addTask }) {
   const [isOpen, openDialog, closeDialog] = useDialog();
   const [taskData, updateValue, clearForm] = useForm({
      name: '',
      priority: 0,
   });

   return (
      <>
         <button
            className="rounded-md border px-4 py-1"
            type="button"
            onClick={openDialog}
         >
            Add task
         </button>
         <Dialog
            isOpen={isOpen}
            closeDialog={closeDialog}
            onSuccess={() => {
               const task = {
                  id: generateId(),
                  isFinished: false,
                  ...taskData,
               };
               addTask(task);
               clearForm();
            }}
         >
            <h2>Create Task</h2>
            <TaskForm task={taskData} updateValue={updateValue} />
         </Dialog>
      </>
   );
}
