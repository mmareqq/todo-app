import DeleteButton from '@ui/DeleteButton';

const ProjectButton = ({ project, setActiveProjectId, removeProject }) => {
   return (
      <div className="flex pr-1 pl-3">
         <button
            className="w-full py-3 text-start"
            type="button"
            onClick={() => setActiveProjectId(project.id)}
         >
            {project.name}
         </button>
         {project.editable && (
            <DeleteButton
               remove={() => {
                  removeProject(project.id);
                  localStorage.removeItem(`tasks-${project.id}`);
               }}
            >
               {project.name}
            </DeleteButton>
         )}
      </div>
   );
};

export default ProjectButton;
