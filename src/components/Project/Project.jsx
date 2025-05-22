import UserProject from './UserProject';
import UpcomingProject from './UpcomingProject';

const Project = ({ project, editProject }) => {
   if (project.id === 'upcoming') return <UpcomingProject project={project} />;

   if (project.id === 'today') return <UserProject project={project} />;

   return <UserProject project={project} editProject={editProject} />;
};

export default Project;
