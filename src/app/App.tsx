import './styles/main.css';

import GrainEffect from '@assets/GrainEffect.jsx';
import Project from '@components/Project';
import Navbar from '@components/Navbar.jsx';

import SettingsProvider from '@contexts/SettingsProvider';

import useProjects from './useProjects';
import useActiveProject from './useActiveProject';

const App = () => {
   const { projects, addProject, editProject, removeProject } = useProjects();
   const { activeProject, setActiveProjectId } = useActiveProject(projects);

   return (
      <SettingsProvider>
         <div className="body bg-primary-900 text-primary-50">
            <div>
               <h1 className="border-primary-500 m-4 ml-auto w-min border-r border-b p-2 font-mono text-3xl leading-none font-bold">
                  To <br /> Do
               </h1>
               <Navbar
                  projects={projects}
                  addProject={addProject}
                  removeProject={removeProject}
                  activeProjectId={activeProject.id}
                  setActiveProjectId={setActiveProjectId}
               />
            </div>
            <main className="h-svh w-full">
               <GrainEffect opacity={0.03} noiseValue={10} />
               <GrainEffect opacity={0.025} color="#E0AC69" noiseValue={1} />
               <Project project={activeProject} editProject={editProject} />
            </main>
         </div>
      </SettingsProvider>
   );
};

export default App;
