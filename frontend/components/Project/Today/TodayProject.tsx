import Body from '../common/Body';
import AddTask from '../common/AddTask';
import Title from '../common/Title';
import { appProjects } from '@frontend/data/data';
import InfoPanel from '../common/InfoPanel';

import { useTodayTasksQuery } from './useTodayTasksQuery';
import { Project } from '@types';

const TodayProject = () => {
   const project = appProjects[0];
   const { data: tasks, isFetching, isSuccess, error } = useTodayTasksQuery();
   if (isFetching) return <Template project={project} />;
   if (!isSuccess) return <div>Error fetching {JSON.stringify(error)}</div>;

   return (
      <div className="wrapper grid h-svh content-start items-start overflow-y-hidden">
         <Title title={project.name} />
         <InfoPanel />
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
         <InfoPanel />
         <Body tasks={[]} />

         <div className="mt-4 flex justify-end">
            <AddTask projectId={project.id} />
         </div>
      </div>
   );
};

export default TodayProject;
