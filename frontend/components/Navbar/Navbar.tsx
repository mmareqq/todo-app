import AddProject from './AddProject';
import NavButton from './NavButton';
import { appProjects } from '@frontend/data/data';
import { useProjectsQuery, useInboxProjectQuery } from './api/projectsQuery';

import useSettingsContext from '@hooks/useSettingsContext';
const inboxTemplate = { id: -10, name: 'Inbox temp', type: 'preset' } as const;

const Navbar = () => {
   const { settings, updateSetting } = useSettingsContext();

   const { data: inboxProject = inboxTemplate, isError: isErrorInbox } =
      useInboxProjectQuery();
   const { data: projects = [], isError } = useProjectsQuery();

   if (isErrorInbox || isError) return <div>Error fetching projects</div>;
   return (
      <nav className="py-4">
         <ul className="mt-12 flex flex-col gap-0">
            <NavButton
               isActive={inboxProject.id === settings.activeProjectId}
               updateActiveId={id => updateSetting('activeProjectId', id)}
               project={inboxProject}
            />
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
