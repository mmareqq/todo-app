import { useTasksQuery } from '../api/useTasksQuery';
import TaskList from '../common/TaskList';
import { appProjects } from '@shared/data/data';

const TodayBody = () => {
   const { data: tasks = [], isError } = useTasksQuery(appProjects.today.id);
   if (isError) return 'Error fetching today tasks';

   return <TaskList tasks={tasks} />;
};

export default TodayBody;
