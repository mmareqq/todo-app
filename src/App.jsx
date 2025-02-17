import { useState, useEffect } from 'react';
import './main.css';
import GrainEffect from './assets/GrainEffect.jsx';
import Project from './components/Project.jsx';
import Navbar from './components/Navbar.jsx';

import ProjectModel from './utils/projectModel.js';
import TaskModel from './utils/taskModel.js';
export default function App() {
   const [tasks, setTasks] = useState(
      JSON.parse(localStorage.getItem('tasks')) || [],
   );
   const [projects, setProjects] = useState(
      JSON.parse(localStorage.getItem('projects')) || [],
   );
   // const [tasks, setTasks] = useState([
   //    new TaskModel('1-1', 'Go for a walk', 2, false),
   //    new TaskModel('1-2', 'Read a book', 1, true),
   // ]);
   // const [projects, setProjects] = useState([
   //    new ProjectModel('1', 'Project 1'),
   //    new ProjectModel('2', 'Project 2'),
   //    new ProjectModel('3', 'Project 3'),
   // ]);
   // const [activeProjectId, setActiveProjectId] = useState('1');

   const [activeProjectId, setActiveProjectId] = useState(
      localStorage.getItem('activeProjectId') || null,
   );
   let activeProject;
   let activeTasks = [];
   if (activeProjectId) {
      activeProject = projects.find(project => project.id === activeProjectId);
      activeTasks = tasks.filter(task => task.id.startsWith(activeProject.id));
   }

   useEffect(() => {
      localStorage.setItem('activeProjectId', activeProjectId);
   }, [activeProjectId]);

   useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
   }, [tasks]);

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
               {activeProject && (
                  <Project
                     project={activeProject}
                     tasks={activeTasks}
                     setTasks={setTasks}
                  ></Project>
               )}
            </div>
         </main>
      </div>
   );
}
