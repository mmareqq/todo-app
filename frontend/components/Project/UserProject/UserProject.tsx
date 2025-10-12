import Title from '../common/Title';
import InfoPanel from '../common/InfoPanel';
import AddTask from '../common/AddTask';
import EditProject from './EditProject';
import DeleteButton from '@ui/DeleteButton';
import UserBody from './UserBody';
import useProjectQuery from './api/useProjectQuery';

import { defaultProjectId } from '@frontend/data/data';
import type { StateSetter } from '@frontend/data/helperTypes';
import type { Id } from '@frontend/data/types';

import { useRemoveProjectMutation } from './api/useRemoveProjectMutation';
import { useTasksDurationQuery } from './api/useTasksQuery';

type Props = {
   projectId: Id;
   setActiveId: StateSetter<Id>;
};

function UserProject({ projectId, setActiveId }: Props) {
   const projTemplate = {
      id: projectId,
      name: '...',
      type: 'custom',
   } as const;

   const { data: project = projTemplate, isError } = useProjectQuery(projectId);
   const { mutate: removeProject } = useRemoveProjectMutation(projectId);

   const { data: totalDuration = 0 } = useTasksDurationQuery(projectId);

   if (isError) return <div>Error fetching user project</div>;

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
         <UserBody projectId={projectId} />

         <div className="mt-4 flex justify-end">
            <AddTask projectId={project.id} />
         </div>
      </div>
   );
}

export default UserProject;
