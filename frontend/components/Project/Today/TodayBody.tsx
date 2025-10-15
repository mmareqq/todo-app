import { useTodayTasksQuery } from './todayTasksQuery';
import TaskList from '../common/TaskList';
import { appProjects } from '@frontend/data/data';

const TodayBody = () => {
   const { data: tasks = [], isError } = useTodayTasksQuery();
   if (isError) return 'Error fetching today tasks';

   return <TaskList tasks={tasks} />;
};

export default TodayBody;
