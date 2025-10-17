import './styles/main.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import GrainEffect from '@ui/GrainEffect.js';
import Project from '@components/Project';
import Navbar from '@components/Navbar/Navbar.js';

import SettingsProvider from '@contexts/SettingsProvider';

import useActiveProjectId from './useActiveProjectId';

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

import logo from '../public/favicon.svg';

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = client;
const App = () => {
   return (
      <QueryClientProvider client={client}>
         <SettingsProvider>
            <div className="body bg-primary-900 text-primary-50 h-screen">
               <div className="custom-scrollbar h-screen overflow-y-auto py-4">
                  <h1 className="border-primary-500 flex justify-end gap-2 border-r pr-2 font-mono text-3xl leading-none font-bold select-none">
                     <img
                        className="pointer-events-none select-none"
                        src={logo}
                        width="32"
                        height="32"
                     />
                     <span>
                        To <br /> Do
                     </span>
                  </h1>

                  <Navbar />
               </div>
               <main className="h-svh w-full">
                  <GrainEffect opacity={0.03} noiseValue={10} />
                  <GrainEffect opacity={0.018} color="#E0AC69" noiseValue={1} />

                  <Project />
               </main>
            </div>
         </SettingsProvider>
      </QueryClientProvider>
   );
};

export default App;
