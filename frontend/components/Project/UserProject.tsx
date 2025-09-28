import DialogProvider from '@contexts/DialogProvider';
import Title from './components/Title';
import InfoPanel from './components/InfoPanel';
import Body from './components/Body';
import AddTask from './components/AddTask';
import EditProjectDialog from './components/EditProjectDialog';

import type { Id } from '@frontend/data/types';
import { useProjectQuery, useTasksQuery } from './queries';

function UserProject({ projectId }: { projectId: Id }) {
   const projectQuery = useProjectQuery(projectId);
   const tasksQuery = useTasksQuery(projectId);

   if (projectQuery.isFetching || tasksQuery.isFetching) {
      return <Template projectId={projectId} />;
   }
   if (!projectQuery.isSuccess || !tasksQuery.isSuccess) {
      return <div>Error fetching project data</div>;
   }

   const project = projectQuery.data;
   const tasks = tasksQuery.data;

   const totalDuration = tasks.reduce((acc, task) => task.duration + acc, 0);

   return (
      <div className="wrapper grid h-svh content-start items-start overflow-y-hidden">
         <DialogProvider>
            <Title
               title={project.name}
               isEditable={project.type === 'custom'}
            />
            <EditProjectDialog project={project} />
         </DialogProvider>

         <InfoPanel totalDuration={totalDuration} />
         <Body tasks={tasks} />

         <div className="mt-4 flex justify-end">
            <AddTask projectId={project.id} />
         </div>
      </div>
   );
}

const Template = ({ projectId }: { projectId: Id }) => {
   return (
      <div className="wrapper grid h-svh content-start items-start overflow-y-hidden">
         <Title title="Fetching..." isEditable={false} />

         <InfoPanel totalDuration={0} />
         <Body tasks={[]} />

         <div className="mt-4 flex justify-end">
            <AddTask projectId={projectId} />
         </div>
      </div>
   );
};

export default UserProject;
