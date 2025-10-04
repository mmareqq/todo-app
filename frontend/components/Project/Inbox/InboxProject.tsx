import InboxBody from './InboxBody';
import Title from '../common/Title';
import InfoPanel from '../common/InfoPanel';
import AddTask from '../common/AddTask';

import { appProjects } from '@frontend/data/data';

const InboxProject = () => {
   const project = appProjects.inbox;

   return (
      <div className="wrapper grid h-svh content-start items-start overflow-y-hidden">
         <Title title={project.name} />
         <InfoPanel />
         <InboxBody />

         <div className="mt-4 flex justify-end">
            <AddTask projectId={project.id} />
         </div>
      </div>
   );
};

export default InboxProject;
