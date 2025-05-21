import { useState, useEffect } from 'react';
import { appProjects } from '@data/data';

function getProjects() {
   const projects = localStorage.getItem('projects');
   return JSON.parse(projects) || appProjects;
}

function useProjects() {
   const [projects, setProjects] = useState(getProjects);

   const addProject = newProject => {
      setProjects(prevProjects => [...prevProjects, newProject]);
   };

   useEffect(() => {
      localStorage.setItem('projects', JSON.stringify(projects));
   }, [projects]);

   const editProject = editedProject => {
      setProjects(prevProjects => {
         return prevProjects.map(project =>
            project.id === editedProject.id ? editedProject : project,
         );
      });
   };

   const removeProject = id => {
      setProjects(prevProjects => prevProjects.filter(proj => proj.id !== id));
   };

   return { projects, addProject, editProject, removeProject };
}

export default useProjects;
