import { useState } from 'react';
import './main.css';
import ProjectButton from './components/ProjectButton.jsx';
import Hr from './components/Hr.jsx';
import GrainEffect from './assets/GrainEffect.jsx';
import ProjectModel from './utils/ProjectModel.js';
import Project from './components/Project.jsx';
import TaskModel from './utils/TaskModel.js';

export default function App() {
   const [activeProject, setActiveProject] = useState(0);
   const [projects, setProjects] = useState([
      new ProjectModel(0, 'Project 1', [
         new TaskModel(0, 'Go for a walk', 2, true),
         new TaskModel(1, 'Study', 1, false),
      ]),
      new ProjectModel(1, 'Project 2'),
      new ProjectModel(2, 'Project 3'),
   ]);

   const removeProject = id => {
      setProjects(p => {
         return p.filter(project => project.id !== id);
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
      <div className="body">
         <aside className="sidebar h-full max-w-600 text-white">
            <h1 className="p-4 text-3xl">Just Do It!</h1>
            <nav className="projects-list bg-red-300">
               <ul className="mt-24 flex flex-col gap-0">
                  {projects.map((project, index) => {
                     return (
                        <>
                           <li className={`p-3 ${index > 0 ? 'border-t' : ''}`}>
                              <ProjectButton
                                 text={project.name}
                                 id={project.id}
                                 removeProject={removeProject}></ProjectButton>
                           </li>
                        </>
                     );
                  })}
               </ul>
            </nav>
         </aside>
         <main>
            <GrainEffect opacity={0.025} noiseValue={15} />
            <GrainEffect opacity={0.035} color="#E0AC69" noiseValue={15} />

            {projects.map(project => {
               return <Project projectObj={project}></Project>;
            })}
         </main>
      </div>
   );
}
