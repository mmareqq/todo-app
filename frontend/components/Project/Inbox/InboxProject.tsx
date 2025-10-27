import InboxBody from './InboxBody';
import Title from '../common/Title';
import InfoPanel from '../common/InfoPanel';
import AddTask from '../common/AddTask';
import { useTasksDurationQuery } from '../api/useTasksQuery';
import { appProjects } from '@frontend/data/data';

const InboxProject = () => {
   const project = appProjects.inbox;
   const { data: totalDuration = 0 } = useTasksDurationQuery(project.id);
   return (
      <div className="project wrapper grid h-svh content-start items-start overflow-y-hidden">
         <Title title={project.name} />
         <InfoPanel totalDuration={totalDuration} />
         <InboxBody />

         <div className="mt-4 flex justify-end">
            <AddTask projectId={project.id} initialDate={false} />
         </div>
      </div>
   );
};

export default InboxProject;
