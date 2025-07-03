import { useMemo } from 'react';
import ProjectButton from './ProjectButton';
import DialogProvider from '@contexts/DialogProvider';
import ButtonAddProject from './ButtonAddProject';
import AddProjectDialog from './AddProjectDialog';

import { defaultProjectId } from '@data/data';

import type { Project } from '@data/types';
import type { StateSetter } from '@data/helperTypes';

type Id = Project['id'];

type Props = {
   projects: Project[];
   addProject: (project: Project) => void;
   removeProject: (id: Id) => void;
   activeProjectId: Id;
   setActiveProjectId: StateSetter<Id>;
};

const Navbar = ({
   projects,
   addProject,
   removeProject,
   activeProjectId,
   setActiveProjectId,
}: Props) => {
   const [presetProjects, customProjects] = useMemo(() => {
      const preset: Project[] = [];
      const custom: Project[] = [];
      projects.forEach((p) =>
         p.createdByUser ? preset.push(p) : custom.push(p),
      );
      return [preset, custom];
   }, [projects]);

   const renderProjectButton = (project: Project) => {
      const isActive = project.id === activeProjectId;

      const handleClick = () => setActiveProjectId(project.id);

      const handleRemove = () => {
         removeProject(project.id);
         localStorage.removeItem(`tasks-${project.id}`);
         if (isActive) setActiveProjectId(defaultProjectId);
      };

      return (
         <li
            key={project.id}
            className={`duration-250 active:opacity-80 ${
               isActive ? 'bg-primary-800' : 'bg-primary-700'
            }`}
         >
            <ProjectButton
               project={project}
               onClick={handleClick}
               onRemove={handleRemove}
            />
         </li>
      );
   };

   return (
      <nav>
         <ul className="mt-24 flex flex-col gap-0">
            {presetProjects.map(renderProjectButton)}

            <div className="py-5" />
            <div className="p-2 leading-normal">My Projects</div>

            {customProjects.map(renderProjectButton)}
         </ul>

         <div className="mt-4 px-5">
            <DialogProvider>
               <ButtonAddProject />
               <AddProjectDialog addProject={addProject} />
            </DialogProvider>
         </div>
      </nav>
   );
};

export default Navbar;
