import Title from '../common/Title';
import AddTask from '../common/AddTask';
import UpcomingBody from './UpcomingBody';
import { appProjects } from '@frontend/data/data';

const UpcomingProject = () => {
   return (
      <div className="wrapper grid h-svh content-start items-start overflow-y-hidden">
         <Title title={appProjects.upcoming.name} />
         <UpcomingBody />
         <div className="mt-4 flex justify-end">
            <AddTask projectId={appProjects.upcoming.id} initialDate={true} />
         </div>
      </div>
   );
};

export default UpcomingProject;
