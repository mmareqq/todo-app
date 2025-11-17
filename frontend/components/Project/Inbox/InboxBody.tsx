import { useTasksQuery } from '../api/useTasksQuery';
import TaskList from '../common/TaskList';
import type { Id } from '@types';

const InboxBody = ({ projectId }: { projectId: Id }) => {
   const { data: tasks = [], isPending } = useTasksQuery(projectId);
   if (isPending) return 'Fetching...';
   if (!tasks) return 'Error fetching tasks in InboxBody';

   return <TaskList tasks={tasks} />;
};

export default InboxBody;
