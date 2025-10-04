import TodayBody from './TodayBody';
import AddTask from '../common/AddTask';
import Title from '../common/Title';
import { appProjects } from '@frontend/data/data';
import InfoPanel from '../common/InfoPanel';

const TodayProject = () => {
   const project = appProjects.today;

   return (
      <div className="wrapper grid h-svh content-start items-start overflow-y-hidden">
         <Title title={project.name} />
         <InfoPanel />
         <TodayBody />

         <div className="mt-4 flex justify-end">
            <AddTask
               projectId={
                  appProjects.inbox.id /* tasks made in today stored in inbox */
               }
            />
         </div>
      </div>
   );
};

export default TodayProject;
