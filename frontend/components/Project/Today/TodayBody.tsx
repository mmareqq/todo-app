import { useTodayTasksQuery } from './todayTasksQuery';
import TaskList from '../common/TaskList';
const TodayBody = () => {
   const { data: tasks, isPending } = useTodayTasksQuery();
   if (isPending) return 'Fetching...';
   if (!tasks) return 'Error fethcing tasks in TodayBody';
   const sortedTasks = []; // FIXME: sort tasks in query

   return <TaskList tasks={tasks} />;
};

export default TodayBody;
