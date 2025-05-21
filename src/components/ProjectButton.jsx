import TrashButton from '@components/TrashButton';
export default function ProjectButton({
   project,
   setActiveProjectId,
   removeProject,
}) {
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
            <TrashButton
               remove={() => {
                  removeProject(project.id);
                  localStorage.removeItem(`tasks-${project.id}`);
               }}
               altText={`project ${project.name}`}
            ></TrashButton>
         )}
      </div>
   );
}
