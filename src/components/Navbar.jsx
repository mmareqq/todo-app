import ProjectButton from './ProjectButton';
import ProjectModel from '../utils/projectModel';
import generateId from '../utils/generateId';
export default function Navbar({
   projects,
   setProjects,
   activeProjectId,
   setActiveProjectId,
}) {
   const removeProject = id => {
      setProjects(prevProjects => {
         const newProjects = prevProjects.filter(project => project.id !== id);
         if (newProjects.length === 0) setActiveProjectId(null);
         else if (id === activeProjectId) setActiveProjectId(newProjects[0].id);

         return newProjects;
      });
   };

   const addProject = newProject => {
      setProjects(p => {
         if (p.length === 0) setActiveProjectId(newProject.id);
         return [...p, newProject];
      });
   };

   const editProject = newProject => {
      setProjects(p => {
         return p.map(project =>
            project.id === newProject ? newProject : project,
         );
      });
   };

   return (
      <nav>
         <ul className="mt-24 flex flex-col gap-0">
            {projects.map((project, index) => {
               return (
                  <li
                     key={index}
                     className={`duration-250 active:opacity-80 ${index > 0 ? 'border-t border-white/20' : ''} ${
                        project.id === activeProjectId
                           ? 'project-btn-active bg-gray-900'
                           : 'bg-gray-800'
                     }`}
                  >
                     <ProjectButton
                        project={project}
                        setActiveProjectId={setActiveProjectId}
                        removeProject={removeProject}
                     ></ProjectButton>
                  </li>
               );
            })}
         </ul>
         <div className="mt-4 px-5">
            <button
               className="mr-5 w-full rounded-lg border px-4 py-1 transition-colors duration-200 hover:bg-gray-400/10"
               type="button"
               onClick={() => {
                  const project = new ProjectModel(generateId(), 'Dom');
                  localStorage.setItem(`tasks-${project.id}`, '[]');
                  addProject(project);
               }}
            >
               Add project
            </button>
         </div>
      </nav>
   );
}
