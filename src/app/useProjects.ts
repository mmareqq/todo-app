import { useState, useEffect } from 'react';
import { appProjects } from '@data/data';

import type { Project } from '@data/types';

const getProjects = (): Project[] => {
   const projects = localStorage.getItem('projects');
   return projects ? JSON.parse(projects) : appProjects;
};

const useProjects = () => {
   const [projects, setProjects] = useState(getProjects);

   // Sync with localStorage
   useEffect(() => {
      localStorage.setItem('projects', JSON.stringify(projects));
   }, [projects]);

   const addProject = (newProject: Project) => {
      setProjects((prevProjects) => [...prevProjects, newProject]);
   };

   const editProject = (newProject: Project) => {
      setProjects((prevProjects) =>
         prevProjects.map((project) =>
            project.id === newProject.id ? newProject : project,
         ),
      );
   };

   const removeProject = (id: Project['id']) => {
      setProjects((prevProjects) =>
         prevProjects.filter((proj) => proj.id !== id),
      );
   };

   return { projects, addProject, editProject, removeProject };
};

export default useProjects;
