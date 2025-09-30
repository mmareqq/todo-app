import Title from './components/Title';
import InfoPanel from './components/InfoPanel';
import Body from './components/Body';
import AddTask from './components/AddTask';
import EditProject from './components/EditProject';
import DeleteButton from '@ui/DeleteButton';
import type { Id } from '@frontend/data/types';
import { StateSetter } from '@frontend/data/helperTypes';
import { defaultProjectId } from '@frontend/data/data';
import {
   useProjectQuery,
   useTasksQuery,
   useRemoveProjectMutation,
} from './queries';

type Props = {
   projectId: Id;
   setActiveId: StateSetter<Id>;
};

function UserProject({ projectId, setActiveId }: Props) {
   const projectQuery = useProjectQuery(projectId);
   const tasksQuery = useTasksQuery(projectId);
   const { mutate: removeProject } = useRemoveProjectMutation(projectId);
   if (
      (projectQuery.isFetching || tasksQuery.isFetching) &&
      !projectQuery.isRefetching
   ) {
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
         <Title title={project.name}>
            <div className="flex items-center gap-1">
               <EditProject project={project} />
               <DeleteButton
                  onRemove={() => {
                     removeProject();
                     setActiveId(defaultProjectId);
                  }}
                  label={project.name}
               />
            </div>
         </Title>

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
         <Title title="..."></Title>

         <InfoPanel totalDuration={0} />
         <Body tasks={[]} />

         <div className="mt-4 flex justify-end">
            <AddTask projectId={projectId} />
         </div>
      </div>
   );
};

export default UserProject;
