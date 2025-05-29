import { useState, useEffect, useMemo } from 'react';

import type { Project } from '@data/types';

const defaultProjId = 'today';

const getActiveId = () => {
   return localStorage.getItem('activeProjectId') || defaultProjId;
};

const useActiveProject = (projects: Project[]) => {
   const [activeProjectId, setActiveProjectId] = useState(getActiveId);

   // Get project based on id
   const activeProject = useMemo(() => {
      const proj = projects.find((p) => p.id === activeProjectId);
      if (proj) return proj;

      // if project with activeId doesn't exist -> set it to today proj
      setActiveProjectId('today');
      return projects.find((p) => p.id === 'today');
   }, [projects, activeProjectId]);

   useEffect(() => {
      localStorage.setItem('activeProjectId', activeProjectId);
   }, [activeProjectId]);

   return { activeProject, activeProjectId, setActiveProjectId };
};

export default useActiveProject;
