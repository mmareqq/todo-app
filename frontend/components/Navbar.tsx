import DialogProvider from '@contexts/DialogProvider';
import ButtonAddProject from './ButtonAddProject';
import AddProjectDialog from './AddProjectDialog';
import Button from '@ui/Button';
import { useProjectsQuery, useProjectAddMutation } from './projectsQuery';

import type { Project, Id } from '@frontend/data/types';
import type { StateSetter } from '@frontend/data/helperTypes';
import { twMerge } from 'tailwind-merge';

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
      isError,
      error,
   } = useProjectsQuery();

   if (isError) console.log(error);
   const { mutate: addProject } = useProjectAddMutation();
   const proj: Project = {
      id: 3489033,
      name: 'new  Project created with btn',
      type: 'custom',
   };
   return (
      <nav className="py-4">
         <ul className="mt-12 flex flex-col gap-0">
            {presetProjects.map(p => (
               <NavButton
                  key={p.id}
                  isActive={p.id === activeProjectId}
                  onClick={() => setActiveProjectId(p.id)}
                  project={p}
               />
            ))}
         </ul>
         <div className="mt-4 flex justify-between p-2 leading-normal">
            <h2>My Projects</h2>
            <Button onClick={() => addProject(proj)}>
               send mutate req to the server
            </Button>
            <div>
               <DialogProvider>
                  <ButtonAddProject />
                  <AddProjectDialog addProject={() => console.log('adf')} />
               </DialogProvider>
            </div>
         </div>

         {isFetching && <div>Fetching...</div>}

         <ul className="flex flex-col gap-0">
            {isSuccess &&
               projects.map(p => (
                  <NavButton
                     key={p.id}
                     isActive={p.id === activeProjectId}
                     onClick={() => setActiveProjectId(p.id)}
                     project={p}
                  />
               ))}
         </ul>
      </nav>
   );
};

type ButtonProps = {
   isActive: boolean;
   onClick: () => void;
   project: Project;
};

const NavButton = ({ isActive, onClick, project }: ButtonProps) => {
   return (
      <li
         className={`border-l-2 border-transparent px-2 ${isActive && 'border-l-accent-700'}`}
      >
         <Button
            variant="none"
            className={twMerge(
               'hover:bg-primary-700/50 nav-btn w-full rounded-md px-3 py-1.5 text-start',
               isActive && 'bg-primary-700/30 hover:bg-primary-none',
            )}
            onClick={onClick}
         >
            {project.name}
         </Button>
      </li>
   );
};

export default Navbar;
