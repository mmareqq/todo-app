import { Dot } from '@assets/Icons';
import { capitalize } from '@utils/stringUtils';
import Button from './Button';

import useSettingsContext from '@hooks/useSettingsContext';

const DropdownItem = ({ value, close }) => {
   const { settings, updateSetting } = useSettingsContext();

   return (
      <div>
         <Button
            variant="none"
            className="hover:bg-primary-600 bg-primary-800 border-primary-400 outline-primary-600 flex w-full items-center gap-1 py-1.5 outline-1 transition-colors"
            onClick={() => {
               close();
               updateSetting('sortMethod', value);
            }}
         >
            <div>
               <Dot
                  width="20"
                  height="20"
                  className={settings.sortMethod === value ? '' : 'invisible'}
               />
            </div>
            <span>{capitalize(value)}</span>
         </Button>
         <div className="sr-only">
            <label htmlFor={value}>{value}</label>
            <input type="radio" id={value} value={value} />
         </div>
      </div>
   );
};

export default DropdownItem;
