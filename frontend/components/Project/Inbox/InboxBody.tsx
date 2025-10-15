import { useTasksQuery } from '../UserProject/api/useTasksQuery';
import { appProjects } from '@frontend/data/data';
import TaskList from '../common/TaskList';

const InboxBody = () => {
   const { data: tasks = [], isPending } = useTasksQuery(appProjects.inbox.id);
   if (isPending) return 'Fetching...';
   if (!tasks) return 'Error fethcing tasks in InboxBody';
   return <TaskList tasks={tasks} />;
};

export default InboxBody;
