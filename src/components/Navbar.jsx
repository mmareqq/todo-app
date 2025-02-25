import ButtonAddProject from './ButtonAddProject';
import ProjectButton from './ProjectButton';
ButtonAddProject;
export default function Navbar({
   projects,
   setProjects,
   activeProjectId,
   setActiveProjectId,
}) {
   const removeProject = id => {
      setProjects(prevProjects => prevProjects.filter(proj => proj.id !== id));
   };

   const addProject = newProject => {
      setProjects(prevProjects => [...prevProjects, newProject]);
   };

   const editProject = newProject => {
      setProjects(prevProjects => {
         return prevProjects.map(proj =>
            proj.id === newProject ? newProject : proj
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
                     className={`duration-250 active:opacity-80 ${
                        project.id === activeProjectId
                           ? 'project-btn-active bg-primary-800'
                           : 'bg-primary-700'
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
            <ButtonAddProject addProject={addProject} />
         </div>
      </nav>
   );
}
