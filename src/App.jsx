import { useState, useEffect, useMemo } from 'react';
import './main.css';

import GrainEffect from './assets/GrainEffect.jsx';
import Project from './components/Project.jsx';
import Navbar from './components/Navbar.jsx';

function getSettings() {
   return (
      JSON.parse(localStorage.getItem('settings')) || {
         sortMethod: 'priority',
      }
   );
}

function getProjects() {
   const coreProjects = [
      { id: 'today', name: 'Today', editable: false, createdByUser: false },
      {
         id: 'upcoming',
         name: 'Upcoming',
         editable: false,
         createdByUser: false,
      },
   ];
   return JSON.parse(localStorage.getItem('projects')) || coreProjects;
}
function getActiveId() {
   return localStorage.getItem('activeProjectId') || null;
}

export default function App() {
   const [settings, setSettings] = useState(getSettings);
   const [projects, setProjects] = useState(getProjects);
   const [activeProjectId, setActiveProjectId] = useState(getActiveId);
   const activeProject = useMemo(
      () => projects.find(p => p.id === activeProjectId) ?? null,
      [projects, activeProjectId]
   );

   useEffect(() => {
      localStorage.setItem('settings', JSON.stringify(settings));
   }, [settings]);

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
   }, [projects, activeProjectId, setActiveProjectId]);

   const editProject = editedProject => {
      setProjects(prevProjects => {
         return prevProjects.map(project =>
            project.id === editedProject.id ? editedProject : project
         );
      });
   };

   const updateSettings = (settingName, value) =>
      setSettings(prevSettings => {
         return { ...prevSettings, [settingName]: value };
      });

   return (
      <div className="body bg-primary-900 text-primary-50">
         <div>
            <h1 className="border-primary-500 m-4 ml-auto w-min border-r border-b p-2 font-mono text-3xl leading-none font-bold">
               To <br /> Do
            </h1>
            <Navbar
               projects={projects}
               setProjects={setProjects}
               activeProjectId={activeProjectId}
               setActiveProjectId={setActiveProjectId}
            />
         </div>
         <main>
            <div className="main wrapper h-svh">
               <GrainEffect opacity={0.01} noiseValue={15} />
               <GrainEffect opacity={0.025} color="#E0AC69" noiseValue={15} />
               {activeProject && (
                  <Project
                     editProject={editProject}
                     project={activeProject}
                     sortMethod={settings.sortMethod}
                     updateSettings={updateSettings}
                  />
               )}
            </div>
         </main>
      </div>
   );
}
