import { useState, useEffect } from 'react';
import './main.css';
import GrainEffect from './assets/GrainEffect.jsx';
import Project from './components/Project.jsx';
import Navbar from './components/Navbar.jsx';

export default function App() {
   const [projects, setProjects] = useState(
      JSON.parse(localStorage.getItem('projects')) || []
   );

   const [activeProjectId, setActiveProjectId] = useState(
      localStorage.getItem('activeProjectId') || null
   );

   useEffect(() => {
      localStorage.setItem('activeProjectId', activeProjectId);
   }, [activeProjectId]);

   useEffect(() => {
      localStorage.setItem('projects', JSON.stringify(projects));
   }, [projects]);

   useEffect(() => {
      if (projects.length === 0) {
         setActiveProjectId(null);
         return;
      }
      if (!projects.find(p => p.id === activeProjectId)) {
         setActiveProjectId(projects[0].id);
      }
   }, [projects, setActiveProjectId]);

   const activeProject = projects.find(p => p.id === activeProjectId) ?? null;

   return (
      <div className="body bg-primary-900 text-gray-50">
         <div className="sidebar h-full max-w-600 text-white">
            <h1 className="sp-4 text-3xl">Just Do It!</h1>
            <Navbar
               projects={projects}
               setProjects={setProjects}
               activeProjectId={activeProjectId}
               setActiveProjectId={setActiveProjectId}
            />
         </div>
         <main>
            <div className="main wrapper h-full">
               <GrainEffect opacity={0} noiseValue={15} />
               <GrainEffect opacity={0.03} color="#E0AC69" noiseValue={15} />
               {activeProject && <Project project={activeProject} />}
            </div>
         </main>
      </div>
   );
}
