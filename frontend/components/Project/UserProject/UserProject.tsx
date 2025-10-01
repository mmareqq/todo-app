import Title from '../common/Title';
import InfoPanel from '../common/InfoPanel';
import AddTask from '../common/AddTask';
import EditProject from './EditProject';
import DeleteButton from '@ui/DeleteButton';
import UserBody from './UserBody';
import useProjectQuery from './queries/useProjectQuery';
import { useRemoveProjectMutation } from './queries/useRemoveProjectMutation';

import { defaultProjectId } from '@frontend/data/data';
import type { StateSetter } from '@frontend/data/helperTypes';
import type { Id } from '@frontend/data/types';

type Props = {
   projectId: Id;
   setActiveId: StateSetter<Id>;
};

function UserProject({ projectId, setActiveId }: Props) {
   const { data: project, isPending } = useProjectQuery(projectId);
   const { mutate: removeProject } = useRemoveProjectMutation(projectId);
   if (isPending) return <Template projectId={projectId} />;

   if (!project) {
      return <div>Error fetching project data</div>;
   }

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

         <InfoPanel />
         <UserBody projectId={projectId} />

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

         <InfoPanel />
         <UserBody projectId={projectId} />

         <div className="mt-4 flex justify-end">
            <AddTask projectId={projectId} />
         </div>
      </div>
   );
};

export default UserProject;
