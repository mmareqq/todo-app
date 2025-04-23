import EditProjectButton from './EditProjectButton';
import { HourGlassIcon } from '../assets/Icons';

function ProjectHeader({ project, editProject, tasksDuration }) {
   console.log(tasksDuration);
   return (
      <div>
         <div className="border-primary-500 flex items-end justify-between border-b-1 py-2">
            <h2 className="pt-4 text-2xl">{project.name}</h2>
            <EditProjectButton
               editProject={editProject}
               project={project}
            ></EditProjectButton>
         </div>
         <div className="my-6 flex items-center gap-1 text-sm">
            <div>
               <HourGlassIcon></HourGlassIcon>
            </div>
            <div>
               <span>Total Duration: </span>
               {tasksDuration}
            </div>
         </div>
      </div>
   );
}
export default ProjectHeader;
