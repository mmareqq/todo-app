import { useTasksQuery } from './api/useTasksQuery';
import type { Id } from '@frontend/data/types';
import TaskList from '../common/TaskList';

const UserBody = ({ projectId }: { projectId: Id }) => {
   const { data: tasks = [], isError } = useTasksQuery(projectId);
   if (isError) return <div>Error fetching user tasks</div>;
   return <TaskList tasks={tasks} />;
};

export default UserBody;
