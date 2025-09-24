import './styles/main.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useProjectsQuery from '../components/useProjectsQuery';

import GrainEffect from '@ui/GrainEffect.js';
import Project from '@components/Project';
import Navbar from '@components/Navbar.jsx';

import SettingsProvider from '@contexts/SettingsProvider';

import useProjects from './useProjects';
import useActiveProject from './useActiveProject';
import Sandbox from './Sandbox';
import { useState } from 'react';
import { defaultProjectId } from '@frontend/data/data';

// active project is not stored
// options:
// active Project in settings, settings stored in db
// active project in localStorage

// This code is only for TypeScript
declare global {
   interface Window {
      __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
   }
}

const client = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 0,
         refetchOnWindowFocus: false,
      },
   },
});

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = client;

const App = () => {
   // const { projects, addProject, editProject, removeProject } = useProjects();
   // const { activeProject, setActiveProjectId } = useActiveProject(projects);
   const [activeProjectId, setActiveProjectId] = useState(defaultProjectId);
   return (
      <QueryClientProvider client={client}>
         <SettingsProvider>
            <div className="body bg-primary-900 text-primary-50 h-screen">
               <div className="custom-scrollbar h-screen overflow-y-auto py-4">
                  <h1 className="border-primary-500 mr-4 ml-auto w-min border-r border-b p-2 font-mono text-3xl leading-none font-bold select-none">
                     To <br /> Do
                  </h1>

                  <Navbar
                     activeProjectId={activeProjectId}
                     setActiveProjectId={setActiveProjectId}
                  />
               </div>
               <main className="h-svh w-full">
                  <GrainEffect opacity={0.03} noiseValue={10} />
                  <GrainEffect opacity={0.018} color="#E0AC69" noiseValue={1} />

                  {/* <Project project={activeProject} editProject={editProject} /> */}
               </main>
            </div>
         </SettingsProvider>
      </QueryClientProvider>
   );
};

export default App;
