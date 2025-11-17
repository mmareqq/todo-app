import './styles/main.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GrainEffect from '@ui/GrainEffect.js';
import Project from '@components/Project';
import Navbar from '@components/Navbar/Navbar.js';
import SettingsProvider from '@contexts/SettingsProvider';
import Button from '@ui/Button';
import Logo from './Logo';
import {
   SignedOut,
   SignedIn,
   SignInButton,
   UserButton,
} from '@clerk/clerk-react';
import LoginGuestButton from './LoginGuestButton';

// This code is only for TS
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

window.__TANSTACK_QUERY_CLIENT__ = client;

const App = () => {
   return (
      <QueryClientProvider client={client}>
         <SettingsProvider>
            <SignedOut>
               <div className="bg-primary-950/50 grid h-screen place-content-center gap-2">
                  <GrainEffect opacity={0.03} noiseValue={10} />
                  <GrainEffect opacity={0.018} color="#E0AC69" noiseValue={1} />
                  <h1 className="mb-4 flex items-center justify-center gap-2 pr-2 font-mono text-4xl font-bold select-none">
                     <Logo />
                     <span>To </span>
                     <span>Do</span>
                  </h1>
                  <SignInButton>
                     <Button className="px-18 py-2">Sign In</Button>
                  </SignInButton>
                  <LoginGuestButton />
               </div>
            </SignedOut>
            <SignedIn>
               <div className="body bg-primary-900 text-primary-100 h-screen">
                  <div className="fixed top-0 right-0 z-20 scale-110 text-2xl">
                     <div className="bg-primary-700/80 rounded-bl-xl pt-3 pr-8 pb-0.5 pl-2.5">
                        <UserButton />
                     </div>
                  </div>
                  <div className="custom-scrollbar h-screen overflow-y-auto py-4">
                     <div className="flex items-center justify-between px-4">
                        <h1 className="flex gap-2 font-mono text-3xl font-bold select-none">
                           <Logo />
                           <span>
                              To <br /> Do
                           </span>
                        </h1>
                     </div>
                     <Navbar />
                  </div>
                  <main className="h-svh w-full">
                     <GrainEffect opacity={0.03} noiseValue={10} />
                     <GrainEffect
                        opacity={0.018}
                        color="#E0AC69"
                        noiseValue={1}
                     />
                     <Project />
                  </main>
               </div>
            </SignedIn>
         </SettingsProvider>
      </QueryClientProvider>
   );
};

export default App;
