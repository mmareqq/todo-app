import UserProject from './UserProject';
import UpcomingProject from './UpcomingProject';
import StickyBoard from '@components/StickyBoard';

import type { ProjectActions } from '@frontend/data/types';

type Props = Pick<ProjectActions, 'project' | 'editProject'>;

const Project = ({ project, editProject }: Props) => {
   if (project.id === 2) return <UpcomingProject project={project} />;

   if (project.id === 3) {
      return <StickyBoard />;
   }
   return <UserProject project={project} editProject={editProject} />;
};

export default Project;
