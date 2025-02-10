import { useState, useEffect } from 'react';
import './main.css';
import ProjectButton from './components/ProjectButton.jsx';
import GrainEffect from './assets/GrainEffect.jsx';
import ProjectModel from './utils/ProjectModel.js';
import Project from './components/Project.jsx';
import TaskModel from './utils/TaskModel.js';

export default function App() {
   const [activeProjectId, setActiveProject] = useState(0);
   const [projects, setProjects] = useState([
      new ProjectModel(0, 'Project 1', [
         new TaskModel(0, 'Go for a walk', 2, true),
         new TaskModel(1, 'Study', 1, false),
      ]),
      new ProjectModel(1, 'Project 2'),
      new ProjectModel(2, 'Project 3'),
   ]);
   const activeProject = projects.find(
      project => project.id === activeProjectId,
   );

   const removeProject = id => {
      setProjects(p => {
         const newProjects = p.filter(proj => proj.id !== id);
         if (!newProjects.length) setActiveProject(null);
         else if (id === activeProject) setActiveProject(newProjects[0].id);

         return newProjects;
      });
   };

   const addProject = newProject => {
      setProjects(p => {
         return [...p, newProject];
      });
   };

   const editProject = newProject => {
      setProjects(p => {
         return p.map(project =>
            project.id === newProject ? newProject : project,
         );
      });
   };

   return (
      <div className="body text-gray-50">
         <aside className="sidebar h-full max-w-600 text-white">
            <h1 className="p-4 text-3xl">Just Do It!</h1>
            <nav className="projects-list">
               <ul className="mt-24 flex flex-col gap-0">
                  {projects.map((project, index) => {
                     return (
                        <li
                           key={index}
                           className={`duration-200 active:opacity-80 ${index > 0 ? 'border-t border-white/20' : ''} ${
                              project.id === activeProjectId
                                 ? 'project-btn-active bg-gray-900'
                                 : 'bg-gray-800'
                           }`}
                        >
                           <ProjectButton
                              text={project.name}
                              id={project.id}
                              setActiveProject={setActiveProject}
                              removeProject={removeProject}
                           ></ProjectButton>
                        </li>
                     );
                  })}
               </ul>
            </nav>
         </aside>
         <main>
            <div className="wrapper h-full">
               <GrainEffect opacity={0.025} noiseValue={15} />
               <GrainEffect opacity={0.035} color="#E0AC69" noiseValue={15} />
               {activeProject && <Project project={activeProject}></Project>}
            </div>
         </main>
      </div>
   );
}
