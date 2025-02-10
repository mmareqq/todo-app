import { TrashIcon } from '../assets/Icons';
export default function ProjectButton({
   text,
   id,
   setActiveProject,
   removeProject,
}) {
   return (
      <div className="items-cente flex pl-3">
         <button
            className="w-full py-3 text-start"
            type="button"
            onClick={() => setActiveProject(id)}>
            {text}
         </button>
         <button
            className="delete-btn bg-opacity-50 mr-1 rounded-md p-1 transition-colors duration-150 hover:bg-gray-800/50"
            type="button"
            onClick={() => removeProject(id)}>
            <span className="sr-only">delete project: {text}</span>
            <TrashIcon className="trash-icon"></TrashIcon>
         </button>
      </div>
   );
}
