import { useState, useEffect, useMemo } from 'react';

import type { Project } from '@frontend/data/types';
import { defaultProjectId } from '@frontend/data/data';

const getActiveId = () => {
   return localStorage.getItem('activeProjectId') || defaultProjectId;
};

const useActiveProject = (projects: Project[]) => {
   const [activeProjectId, setActiveProjectId] = useState(getActiveId);
   const defaultProject = useMemo(() => {
      const p = projects.find(p => p.id === defaultProjectId);
      if (p) return p;
      throw new Error('default project always must be in the projects array');
   }, [projects]);

   const activeProject = useMemo(() => {
      return projects.find(p => p.id === activeProjectId) || defaultProject;
   }, [projects, activeProjectId, defaultProject]);

   useEffect(() => {
      localStorage.setItem('activeProjectId', activeProjectId);
   }, [activeProjectId]);

   return { activeProject, setActiveProjectId };
};

export default useActiveProject;
