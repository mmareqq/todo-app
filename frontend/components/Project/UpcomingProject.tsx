import Title from './components/Title';
import UpcomingBody from './components/UpcomingBody';
import AddTask from './components/AddTask';
import { appProjects } from '@frontend/data/data';

const UpcomingProject = () => {
   const project = appProjects[1];

   return (
      <div className="wrapper grid h-svh content-start items-start overflow-y-hidden">
         <Title title={project.name} isEditable={false} />
         <UpcomingBody />
         <div className="mt-4 flex justify-end">
            <AddTask projectId={project.id} />
         </div>
      </div>
   );
};

export default UpcomingProject;
