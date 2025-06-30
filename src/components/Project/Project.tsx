import UserProject from './UserProject';
import UpcomingProject from './UpcomingProject';

import type { ProjectActions } from '@data/types';

type Props = Pick<ProjectActions, 'project' | 'editProject'>;

const Project = ({ project, editProject }: Props) => {
   if (project.id === 'upcoming') return <UpcomingProject project={project} />;

   if (project.id === 'today')
      return <UserProject project={project} editProject={editProject} />;

   return <UserProject project={project} editProject={editProject} />;
};

export default Project;
