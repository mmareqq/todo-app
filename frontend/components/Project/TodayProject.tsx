import Body from './components/Body';
import AddTask from './components/AddTask';
import Title from './components/Title';
import { appProjects } from '@frontend/data/data';
import InfoPanel from './components/InfoPanel';

import { useTodayTasksQuery } from './queries';
import { Project } from '@types';

const TodayProject = () => {
   const project = appProjects[0];
   const {
      data: tasks,
      isFetching,
      isRefetching,
      isSuccess,
      error,
   } = useTodayTasksQuery();
   if (isFetching) return <Template project={project} />;
   if (!isSuccess) return <div>Error fetching {JSON.stringify(error)}</div>;

   const totalDuration = tasks.reduce((acc, task) => task.duration + acc, 0);

   return (
      <div className="wrapper grid h-svh content-start items-start overflow-y-hidden">
         <Title title={project.name} />
         <InfoPanel totalDuration={totalDuration} />
         <Body tasks={tasks} />

         <div className="mt-4 flex justify-end">
            <AddTask projectId={project.id} />
         </div>
      </div>
   );
};

const Template = ({ project }: { project: Project }) => {
   return (
      <div className="wrapper grid h-svh content-start items-start overflow-y-hidden">
         <Title title={project.name} />
         <InfoPanel totalDuration={0} />
         <Body tasks={[]} />

         <div className="mt-4 flex justify-end">
            <AddTask projectId={project.id} />
         </div>
      </div>
   );
};

export default TodayProject;
