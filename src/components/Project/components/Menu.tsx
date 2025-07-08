import Button from '@ui/Button';

import useDialogContext from '@hooks/useDialogContext';
import { getTasksTemplate } from '@utils/tasks';
import { TaskActions } from '@data/types';

type Props = Pick<TaskActions, 'addTask'> & { projectId: string };

const Menu = ({ addTask, projectId }: Props) => {
   const { openDialog } = useDialogContext();
   return (
      <div className="mt-4 flex justify-end gap-4">
         <Button
            className="rounded-sm border-1 border-yellow-700 px-4 py-1"
            type="button"
            id="btn-tasks-debug"
            onClick={(e) => {
               const template = getTasksTemplate(projectId);
               template.forEach(addTask);
               // @ts-expect-error
               // Only for dev, to be deleted
               e.target.classList.add('hidden');
            }}
         >
            Load 5 tasks
         </Button>
         <Button onClick={openDialog}>Add task</Button>
      </div>
   );
};

export default Menu;
