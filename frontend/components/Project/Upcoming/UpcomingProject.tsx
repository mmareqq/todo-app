import Title from '../common/Title';
import AddTask from '../common/AddTask';
import UpcomingBody from './UpcomingBody';
import { appProjects } from '@frontend/data/data';

const UpcomingProject = () => {
   const project = appProjects[1];

   return (
      <div className="wrapper grid h-svh content-start items-start overflow-y-hidden">
         <Title title={project.name} />
         <UpcomingBody />
         <div className="mt-4 flex justify-end">
            <AddTask projectId={project.id} />
         </div>
      </div>
   );
};

export default UpcomingProject;
