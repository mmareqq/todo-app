import { useState, useEffect, useMemo } from 'react';

const defaultActiveProjectId = 'today';

function getActiveId() {
   return localStorage.getItem('activeProjectId') || defaultActiveProjectId;
}

function useActiveProject(projects) {
   // Initialize activeProjectId
   const [activeProjectId, setActiveProjectId] = useState(getActiveId);

   // Get activeProject based on id
   const activeProject = useMemo(
      () => projects.find(p => p.id === activeProjectId),
      [projects, activeProjectId],
   );

   useEffect(() => {
      localStorage.setItem('activeProjectId', activeProjectId);
   }, [activeProjectId]);

   useEffect(() => {
      // if project with activeId doesn't exist -> set it to today proj
      if (!projects.find(p => p.id === activeProjectId)) {
         setActiveProjectId('today');
      }
   }, [projects, activeProjectId, setActiveProjectId]);

   return { activeProject, activeProjectId, setActiveProjectId };
}

export default useActiveProject;
