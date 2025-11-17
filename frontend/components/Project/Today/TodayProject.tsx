import TodayBody from './TodayBody';
import AddTask from '../common/AddTask';
import Title from '../common/Title';
import { appProjects } from '@frontend/data/data';
import InfoPanel from '../common/InfoPanel';
import { getToday } from '@frontend/utils/time';
import { formatDisplayDate } from '@frontend/utils/time';
import { useTasksDurationQuery } from '../api/useTasksQuery';
import { useInboxProjectQuery } from '@components/Navbar/api/projectsQuery';

const TodayProject = () => {
   const project = appProjects.today;
   const { data: totalDuration = 0 } = useTasksDurationQuery(project.id);
   const { data: inboxProject } = useInboxProjectQuery();

   return (
      <div className="project wrapper grid h-svh content-start items-start overflow-y-hidden">
         <Title title={project.name} className="justify-start gap-2">
            <span className="text-xl text-current/80">
               {formatDisplayDate(getToday(), 'short')}
            </span>
         </Title>
         <InfoPanel totalDuration={totalDuration} />
         <TodayBody />
         <div className="mt-4 flex justify-end">
            {inboxProject && (
               <AddTask projectId={inboxProject.id} initialDate={true} />
            )}
         </div>
      </div>
   );
};

export default TodayProject;
