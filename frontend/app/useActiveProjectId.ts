import { useState, useEffect } from 'react';
import { defaultProjectId } from '@frontend/data/data';

const getActiveId = () => {
   const id = localStorage.getItem('activeProjectId');
   return id ? parseInt(id) : defaultProjectId;
};

const useActiveProjectId = () => {
   const [activeProjectId, setActiveProjectId] = useState(getActiveId);

   useEffect(() => {
      localStorage.setItem('activeProjectId', String(activeProjectId));
   }, [activeProjectId]);

   return { activeProjectId, setActiveProjectId };
};

export default useActiveProjectId;
