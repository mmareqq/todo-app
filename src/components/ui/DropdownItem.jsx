import { Dot } from '@assets/Icons';
import { capitalizeFirstLetter } from '@utils/stringUtils';

const DropdownItem = ({ selected, onClick, value }) => {
   return (
      <div>
         <button
            type="button"
            className="hover:bg-primary-600 border-primary-400 outline-primary-600 flex w-full items-center gap-1 py-1.5 outline-1 transition-colors"
            onClick={onClick}
         >
            <div>
               <Dot
                  width="20"
                  height="20"
                  className={selected ? '' : 'invisible'}
               />
            </div>
            <span>{capitalizeFirstLetter(value)}</span>
         </button>
         <div className="sr-only">
            <label htmlFor={value}>{value}</label>
            <input type="radio" id={value} value={value} />
         </div>
      </div>
   );
};

export default DropdownItem;
