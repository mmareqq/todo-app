import TrashButton from './TrashButton';
export default function ProjectButton({
   project,
   setActiveProjectId,
   removeProject,
}) {
   return (
      <div className="items-cente flex pl-3">
         <button
            className="w-full py-3 text-start"
            type="button"
            onClick={() => setActiveProjectId(project.id)}
         >
            {project.name}
         </button>
         <TrashButton
            remove={() => {
               removeProject(project.id);
               localStorage.removeItem(`tasks-${project.id}`);
            }}
            altText={`project ${project.name}`}
         ></TrashButton>
      </div>
   );
}
