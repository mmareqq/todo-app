import useSettingsContext from '@hooks/useSettingsContext';
import Button from './Button';
import { Dot } from '@assets/Icons';
import { capitalize } from '@frontend/utils/stringUtils';

import type { SortMethod } from '@frontend/data/types';

type Props = {
   value: SortMethod;
   close: () => void;
};

const DropdownItem = ({ value, close }: Props) => {
   const { settings, updateSetting } = useSettingsContext();
   return (
      <div>
         <Button
            variant="none"
            className="hover:bg-primary-600 bg-primary-800 border-primary-400 outline-primary-600 flex w-full items-center gap-0.5 px-0.5 py-1.5 outline-1 transition-colors"
            onClick={() => {
               close();
               updateSetting('sortMethod', value);
            }}
         >
            <div>
               <Dot
                  size={16}
                  className={settings.sortMethod === value ? '' : 'invisible'}
               />
            </div>
            <span>{capitalize(value)}</span>
         </Button>
         <div className="sr-only">
            <label>
               {value}
               <input type="radio" id={value} value={value} />
            </label>
         </div>
      </div>
   );
};

export default DropdownItem;
