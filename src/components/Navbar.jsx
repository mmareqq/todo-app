import { useMemo } from 'react';
import ButtonAddProject from './ButtonAddProject';
import ProjectButton from './ProjectButton';

export default function Navbar({
   projects,
   setProjects,
   activeProjectId,
   setActiveProjectId,
}) {
   const removeProject = id => {
      setProjects(prevProjects => prevProjects.filter(proj => proj.id !== id));
   };

   const addProject = newProject => {
      setProjects(prevProjects => [...prevProjects, newProject]);
   };

   const todayProject = useMemo(
      () => projects.find(p => p.id === 'today'),
      [projects]
   );
   const upcomingProject = useMemo(
      () => projects.find(p => p.id === 'upcoming'),
      [projects]
   );
   const userProjects = useMemo(
      () => projects.filter(p => p.createdByUser),
      [projects]
   );
   return (
      <nav>
         <ul className="mt-24 flex flex-col gap-0">
            <li
               className={`duration-250 active:opacity-80 ${
                  activeProjectId === 'today'
                     ? 'project-btn-active bg-primary-800'
                     : 'bg-primary-700'
               }`}
            >
               <ProjectButton
                  project={todayProject}
                  setActiveProjectId={setActiveProjectId}
                  removeProject={removeProject}
               ></ProjectButton>
            </li>
            <li
               className={`duration-250 active:opacity-80 ${
                  activeProjectId === 'upcoming'
                     ? 'project-btn-active bg-primary-800'
                     : 'bg-primary-700'
               }`}
            >
               <ProjectButton
                  project={upcomingProject}
                  setActiveProjectId={setActiveProjectId}
               ></ProjectButton>
            </li>
            <div className="p-5"></div>
            <div className="p-2 leading-normal">My Projects</div>
            {userProjects.map((project, index) => {
               return (
                  <li
                     key={index}
                     className={`duration-250 active:opacity-80 ${
                        project.id === activeProjectId
                           ? 'project-btn-active bg-primary-800'
                           : 'bg-primary-700'
                     }`}
                  >
                     <ProjectButton
                        project={project}
                        setActiveProjectId={setActiveProjectId}
                        removeProject={removeProject}
                     ></ProjectButton>
                  </li>
               );
            })}
         </ul>
         <div className="mt-4 px-5">
            <ButtonAddProject addProject={addProject} />
         </div>
      </nav>
   );
}
