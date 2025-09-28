import Title from './components/Title';
import Body from './components/Body';
import AddTask from './components/AddTask';
import { appProjects } from '@frontend/data/data';
import InfoPanel from './components/InfoPanel';

import { useTodayTasksQuery } from './queries';

const TodayProject = () => {
   const project = appProjects[1];
   const { data: tasks, isFetching, isSuccess, error } = useTodayTasksQuery();
   if (isFetching) return <div>Fetching...</div>;
   if (!isSuccess) return <div>Error fetching {JSON.stringify(error)}</div>;

   const totalDuration = tasks.reduce((acc, task) => task.duration + acc, 0);

   return (
      <div className="wrapper grid h-svh content-start items-start overflow-y-hidden">
         <Title title={project.name} isEditable={project.type === 'custom'} />

         <InfoPanel totalDuration={totalDuration} />
         <Body tasks={tasks} />

         <div className="mt-4 flex justify-end">
            <AddTask projectId={project.id} />
         </div>
      </div>
   );
};

export default TodayProject;
