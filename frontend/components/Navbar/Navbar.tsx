import AddProject from './AddProject';
import NavButton from './NavButton';
import { appProjects } from '@frontend/data/data';
import useProjectsQuery from './api/projectsQuery';

import type { Id } from '@types';
import useSettingsContext from '@hooks/useSettingsContext';

const Navbar = () => {
   const { data: projects = [], isError } = useProjectsQuery();

   const { settings, updateSetting } = useSettingsContext();
   if (isError) return <div>Error fetching projects</div>;
   return (
      <nav className="py-4">
         <ul className="mt-12 flex flex-col gap-0">
            {Object.values(appProjects).map(p => (
               <NavButton
                  key={p.id}
                  isActive={p.id === settings.activeProjectId}
                  updateActiveId={id => updateSetting('activeProjectId', id)}
                  project={p}
               />
            ))}
         </ul>
         <div className="mt-4 flex justify-between p-2 leading-normal">
            <h2>My Projects</h2>

            <div>
               <AddProject />
            </div>
         </div>

         <ul className="flex flex-col gap-0">
            {projects.map(p => (
               <NavButton
                  key={p.id}
                  isActive={p.id === settings.activeProjectId}
                  updateActiveId={id => updateSetting('activeProjectId', id)}
                  project={p}
               />
            ))}
         </ul>
      </nav>
   );
};

export default Navbar;
