import Title from '../common/Title';
import InfoPanel from '../common/InfoPanel';
import AddTask from '../common/AddTask';
import EditProject from './EditProject';
import DeleteButton from '@ui/DeleteButton';
import UserBody from './UserBody';
import useProjectQuery from './api/useProjectQuery';
import generateId from '@frontend/utils/generateId';

import { defaultProjectId } from '@frontend/data/data';

import { useRemoveProjectMutation } from './api/useRemoveProjectMutation';
import { useTasksDurationQuery } from './api/useTasksQuery';
import useSettingsContext from '@hooks/useSettingsContext';

import type { Project } from '@types';

const UserProject = () => {
   const { settings, updateSetting } = useSettingsContext();
   const projectId = settings.activeProjectId;

   const projTemplate: Project = {
      id: generateId(),
      name: '...',
      type: 'custom',
   };

   const { data: project = projTemplate, isError } = useProjectQuery(projectId);
   const { mutate: removeProject } = useRemoveProjectMutation(projectId);

   const { data: totalDuration = 0 } = useTasksDurationQuery(projectId);

   if (isError) return <div>Error fetching user project</div>;

   return (
      <div className="wrapper grid h-svh content-start items-start overflow-y-hidden">
         <Title title={project.name}>
            <div className="flex items-center gap-1">
               {project !== projTemplate && <EditProject project={project} />}
               <DeleteButton
                  onRemove={() => {
                     removeProject();
                     updateSetting('activeProjectId', defaultProjectId);
                  }}
                  label={project.name}
               />
            </div>
         </Title>

         <InfoPanel totalDuration={totalDuration} />
         <UserBody projectId={projectId} />

         <div className="mt-4 flex justify-end">
            <AddTask projectId={project.id} initialDate={false} />
         </div>
      </div>
   );
};

export default UserProject;
