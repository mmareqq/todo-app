import { useTasksQuery } from './queries/useTasksQuery';
import type { Id } from '@frontend/data/types';
import TaskList from '../common/TaskList';

const UserBody = ({ projectId }: { projectId: Id }) => {
   const { data: tasks, isPending } = useTasksQuery(projectId);
   if (isPending) return 'Fetching...';
   if (!tasks) return 'Error fethcing tasks in UserBody';
   const sortedTasks = []; // FIXME: sort tasks in query
   return <TaskList tasks={tasks} />;
};

export default UserBody;
