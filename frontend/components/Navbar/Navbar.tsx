import { useProjectsQuery } from './projectsQuery';
import AddProject from './AddProject';

import type { Project, Id } from '@frontend/data/types';
import type { StateSetter } from '@frontend/data/helperTypes';
import NavButton from './NavButton';
type Props = {
   activeProjectId: Id;
   setActiveProjectId: StateSetter<Id>;
};

const presetProjects: Project[] = [
   { id: 1, name: 'Today', type: 'preset' },
   { id: 2, name: 'Upcoming', type: 'preset' },
   { id: 3, name: 'StickyBoard', type: 'preset' },
];

const Navbar = ({ activeProjectId, setActiveProjectId }: Props) => {
   const {
      data: projects,
      isSuccess,
      isFetching,
      isRefetching,
      isError,
      error,
   } = useProjectsQuery();

   if (isError) console.log(error);
   return (
      <nav className="py-4">
         <ul className="mt-12 flex flex-col gap-0">
            {presetProjects.map(p => (
               <NavButton
                  key={p.id}
                  isActive={p.id === activeProjectId}
                  setId={setActiveProjectId}
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

         {isFetching && !isRefetching && <div>Fetching...</div>}

         <ul className="flex flex-col gap-0">
            {isSuccess &&
               projects.map(p => (
                  <NavButton
                     key={p.id}
                     isActive={p.id === activeProjectId}
                     setId={setActiveProjectId}
                     project={p}
                  />
               ))}
         </ul>
      </nav>
   );
};

export default Navbar;
