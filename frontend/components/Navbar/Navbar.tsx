import AddProject from './AddProject';
import NavButton from './NavButton';
import { appProjects } from '@frontend/data/data';
import { useProjectsQuery } from './projectsQuery';

import type { Id } from '@frontend/data/types';
import type { StateSetter } from '@frontend/data/helperTypes';

type Props = {
   activeProjectId: Id;
   setActiveProjectId: StateSetter<Id>;
};

const Navbar = ({ activeProjectId, setActiveProjectId }: Props) => {
   const {
      data: projects,
      isSuccess,
      isFetching,
      isRefetching,
   } = useProjectsQuery();

   return (
      <nav className="py-4">
         <ul className="mt-12 flex flex-col gap-0">
            {appProjects.map(p => (
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

         <ul className="flex flex-col gap-0">
            {isFetching && !isRefetching && <div>Fetching...</div>}
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
