import Button from '@ui/Button';

import useDialogContext from '@hooks/useDialogContext';
import { tasksTemplate } from '@data/data';
import { TaskActions } from '@data/types';

type Props = Pick<TaskActions, 'addTask'>;

const Menu = ({ addTask }: Props) => {
   const { openDialog } = useDialogContext();
   return (
      <div className="mt-4 flex justify-end gap-4">
         <Button
            className="rounded-sm border-1 border-yellow-700 px-4 py-1"
            type="button"
            onClick={() => tasksTemplate.forEach((task) => addTask(task))}
         >
            Load 5 tasks
         </Button>
         <Button onClick={openDialog}>Add task</Button>
      </div>
   );
};

export default Menu;
