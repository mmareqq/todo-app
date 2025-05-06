import { HourGlassIcon } from '../assets/Icons';
import ProjectSortMenu from './ProjectSortMenu';

function ProjectInfoBar({ duration, updateSettings, sortMethod }) {
   return (
      <div className="flex items-center justify-between">
         <div className="my-6 flex items-center gap-1 text-sm">
            <HourGlassIcon />
            <div>Total Duration: {duration}</div>
         </div>
         <ProjectSortMenu
            updateSettings={updateSettings}
            sortMethod={sortMethod}
         />
      </div>
   );
}

export default ProjectInfoBar;
