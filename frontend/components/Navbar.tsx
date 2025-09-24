import DialogProvider from '@contexts/DialogProvider';
import ButtonAddProject from './ButtonAddProject';
import AddProjectDialog from './AddProjectDialog';
import Button from '@ui/Button';

import useProjectsQuery from '@components/useProjectsQuery';

import type { Project, Id } from '@frontend/data/types';
import type { StateSetter } from '@frontend/data/helperTypes';

type Props = {
   activeProjectId: Id;
   setActiveProjectId: StateSetter<Id>;
};

const Navbar = ({ activeProjectId, setActiveProjectId }: Props) => {
   const { data: projects, isSuccess, isFetching } = useProjectsQuery();
   const renderButton = useRenderButton({
      activeProjectId,
      setActiveProjectId,
   });

   return (
      <nav className="py-4">
         <ul className="mt-12 flex flex-col gap-0">
            {renderButton({ id: 1, name: 'Today', type: 'preset' })}
            {renderButton({ id: 2, name: 'Upcoming', type: 'preset' })}
            {renderButton({ id: 3, name: 'StickyBoard', type: 'preset' })}
         </ul>
         <div className="mt-4 flex justify-between p-2 leading-normal">
            <h2>My Projects</h2>
            <div>
               <DialogProvider>
                  <ButtonAddProject />
                  <AddProjectDialog addProject={() => console.log('adf')} />
               </DialogProvider>
            </div>
         </div>

         {isFetching && <div>Fetching...</div>}

         <ul className="flex flex-col gap-0">
            {isSuccess && projects.map(renderButton)}
         </ul>
      </nav>
   );
};

const useRenderButton = ({ activeProjectId, setActiveProjectId }: Props) => {
   const renderButton = (project: Project) => {
      const isActive = project.id === activeProjectId;

      const handleClick = () => setActiveProjectId(project.id);
      return (
         <li
            key={project.id}
            className={`border-l-2 border-transparent px-2 ${isActive && 'border-l-accent-700'}`}
         >
            <Button
               variant="none"
               className={`hover:bg-primary-700/50 nav-btn w-full rounded-md px-3 py-1.5 text-start ${isActive && 'bg-primary-700/30 hover:bg-primary-none'}`}
               onClick={handleClick}
            >
               {project.name}
            </Button>
         </li>
      );
   };
   return renderButton;
};

export default Navbar;
