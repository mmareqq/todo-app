import Title from '../common/Title';
import AddTask from '../common/AddTask';
import UpcomingBody from './UpcomingBody';
import { appProjects } from '@frontend/data/data';
import { useInboxProjectQuery } from '@components/Navbar/api/projectsQuery';

const UpcomingProject = () => {
   const { data: inboxProject } = useInboxProjectQuery();
   return (
      <div className="project wrapper grid h-svh content-start items-start overflow-y-hidden">
         <Title title={appProjects.upcoming.name} />
         <UpcomingBody />
         <div className="mt-4 flex justify-end">
            {inboxProject && (
               <AddTask projectId={inboxProject.id} initialDate={true} />
            )}
         </div>
      </div>
   );
};

export default UpcomingProject;
