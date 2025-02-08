import { TrashIcon } from '../assets/Icons';
export default function ProjectButton({ text, id, removeProject, ...props }) {
   return (
      <div className="flex items-center justify-between gap-2">
         <button>{text}</button>
         <button
            type="button"
            onClick={e => {
               e.preventDefault();
               removeProject(id);
            }}>
            <span className="sr-only">delete project: {text}</span>
            <TrashIcon></TrashIcon>
         </button>
      </div>
   );
}
