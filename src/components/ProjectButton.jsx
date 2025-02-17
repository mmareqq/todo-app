import TrashButton from './TrashButton';
export default function ProjectButton({
   text,
   id,
   setActiveProjectId,
   removeProject,
   editProject,
}) {
   return (
      <div className="items-cente flex pl-3">
         <button
            className="w-full py-3 text-start"
            type="button"
            onClick={() => setActiveProjectId(id)}
         >
            {text}
         </button>
         <TrashButton
            remove={removeProject}
            id={id}
            text={`project ${text}`}
         ></TrashButton>
      </div>
   );
}
