import ProjectButton from './ProjectButton';
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
                     className={`duration-200 active:opacity-80 ${index > 0 ? 'border-t border-white/20' : ''} ${
                        project.id === activeProjectId
                           ? 'project-btn-active bg-gray-900'
                           : 'bg-gray-800'
                     }`}
                  >
                     <ProjectButton
                        text={project.name}
                        id={project.id}
                        setActiveProjectId={setActiveProjectId}
                        removeProject={removeProject}
                        editProject={editProject}
                     ></ProjectButton>
                  </li>
               );
            })}
            <li>
               <button>Add project</button>
            </li>
         </ul>
      </nav>
   );
}
