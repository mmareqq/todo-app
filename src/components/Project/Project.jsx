import UserProject from './UserProject';
import UpcomingProject from './UpcomingProject';

const Project = ({ project }) => {
   if (project.id === 'upcoming') return <UpcomingProject project={project} />;

   if (project.id === 'today') return <UserProject project={project} />;

   return <UserProject project={project} />;
};

export default Project;
