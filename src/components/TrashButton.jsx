import { TrashIcon } from '../assets/Icons';
export default function TrashButton({ remove, altText }) {
   return (
      <button
         className="delete-btn bg-opacity-50 my-2 mr-1 rounded-md p-1 transition-colors duration-150 hover:bg-white/8"
         type="button"
         onClick={remove}
      >
         <span className="sr-only">delete: {altText}</span>
         <TrashIcon className="trash-icon"></TrashIcon>
      </button>
   );
}
