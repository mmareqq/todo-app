import { useState, useEffect } from 'react';
import './main.css';
import GrainEffect from './assets/GrainEffect.jsx';
import Project from './components/Project.jsx';
import Navbar from './components/Navbar.jsx';

export default function App() {
   const [projects, setProjects] = useState(
      JSON.parse(localStorage.getItem('projects')) || [],
   );

   const [activeProjectId, setActiveProjectId] = useState(
      localStorage.getItem('activeProjectId') || null,
   );

   const activeProject =
      activeProjectId &&
      projects.find(project => project.id === activeProjectId);

   useEffect(() => {
      localStorage.setItem('activeProjectId', activeProjectId);
   }, [activeProjectId]);

   useEffect(() => {
      localStorage.setItem('projects', JSON.stringify(projects));
   }, [projects]);

   return (
      <div className="body text-gray-50">
         <div className="sidebar h-full max-w-600 text-white">
            <h1 className="p-4 text-3xl">Just Do It!</h1>
            <Navbar
               projects={projects}
               setProjects={setProjects}
               activeProjectId={activeProjectId}
               setActiveProjectId={setActiveProjectId}
            />
         </div>
         <main>
            <div className="wrapper h-full">
               <GrainEffect opacity={0.025} noiseValue={15} />
               <GrainEffect opacity={0.035} color="#E0AC69" noiseValue={15} />

               {activeProject && <Project project={activeProject} />}
            </div>
         </main>
      </div>
   );
}
