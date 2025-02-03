import { TrashIcon } from './assets/Icons';
export default function ProjectButton({ text, ...props }) {
   return (
      <div className="flex items-center justify-between gap-2">
         <button>{text}</button>{' '}
         <button>
            <span className="sr-only">delete project {text}</span>
            <TrashIcon></TrashIcon>
         </button>
      </div>
   );
}
