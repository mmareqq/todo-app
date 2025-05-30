import { useMemo } from 'react';
import ProjectButton from './ProjectButton';
import DialogProvider from '@contexts/DialogProvider';
import ButtonAddProject from './ButtonAddProject';
import AddProjectDialog from './AddProjectDialog';

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
   const todayProject = useMemo(
      () => projects.find((p) => p.id === 'today'),
      [projects],
   );
   const upcomingProject = useMemo(
      () => projects.find((p) => p.id === 'upcoming'),
      [projects],
   );
   if (!todayProject || !upcomingProject) {
      throw new Error('today and upcoming project must be in projects array');
   }

   const userProjects = useMemo(
      () => projects.filter((p) => p.createdByUser),
      [projects],
   );

   return (
      <nav>
         <ul className="mt-24 flex flex-col gap-0">
            <li
               className={`duration-250 active:opacity-80 ${
                  activeProjectId === 'today'
                     ? 'bg-primary-800'
                     : 'bg-primary-700'
               }`}
            >
               <ProjectButton
                  project={todayProject}
                  onClick={() => setActiveProjectId(todayProject.id)}
                  onRemove={() => {
                     removeProject(todayProject.id);
                     localStorage.removeItem(`tasks-${todayProject.id}`);
                  }}
               />
            </li>
            <li
               className={`duration-250 active:opacity-80 ${
                  activeProjectId === 'upcoming'
                     ? 'bg-primary-800'
                     : 'bg-primary-700'
               }`}
            >
               <ProjectButton
                  project={upcomingProject}
                  onClick={() => setActiveProjectId(upcomingProject.id)}
                  onRemove={() => {
                     removeProject(upcomingProject.id);
                     localStorage.removeItem(`tasks-${upcomingProject.id}`);
                  }}
               />
            </li>
            <div className="py-5" />
            <div className="p-2 leading-normal">My Projects</div>
            {userProjects.map((project, index) => {
               return (
                  <li
                     key={index}
                     className={`duration-250 active:opacity-80 ${
                        project.id === activeProjectId
                           ? 'bg-primary-800'
                           : 'bg-primary-700'
                     }`}
                  >
                     <ProjectButton
                        project={project}
                        onClick={() => setActiveProjectId(project.id)}
                        onRemove={() => {
                           removeProject(project.id);
                           localStorage.removeItem(`tasks-${project.id}`);
                        }}
                     />
                  </li>
               );
            })}
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
