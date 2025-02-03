import './main.css';
import ProjectButton from './ProjectButton';
import Hr from '../Hr';
import GrainEffect from './assets/GrainEffect.jsx';
export default function App() {
   return (
      <div className="body">
         <div className="grain-texture">
            <GrainEffect className="grain-effect" opacity={0.9}></GrainEffect>
         </div>
         <aside className="sidebar h-full max-w-60 bg-red-100">
            <h1 className="p-4 text-3xl">Just Do It!</h1>
            <nav className="projects-list bg-red-300">
               <ul className="mt-24 flex flex-col gap-4 p-2">
                  <li>
                     <ProjectButton text="project1"></ProjectButton>
                  </li>
                  <Hr className="bg-gray-500"></Hr>
                  <li>
                     <ProjectButton text="project2"></ProjectButton>
                  </li>
               </ul>
            </nav>
         </aside>
      </div>
   );
}
