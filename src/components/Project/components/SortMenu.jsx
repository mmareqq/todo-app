import { useState } from 'react';
import { ChevronIcon } from '@assets/Icons';

import AnimateExit from '@ui/AnimateExit';
import DropdownItem from '@ui/DropdownItem';
import Button from '@ui/Button';

function SortMenu({ updateSettings, sortMethod }) {
   const [isOpen, setIsOpen] = useState(false);
   const sortOptions = ['priority', 'duration', 'name'];

   const toggleOpen = () => setIsOpen(p => !p);

   function handleSettingsChange(option) {
      updateSettings('sortMethod', option);
      setIsOpen(false);
   }

   return (
      <div className="relative z-10">
         <Button
            variant="dropdown"
            className="flex items-center p-1"
            onClick={toggleOpen}
         >
            <span>Sort By</span>
            <ChevronIcon
               size={20}
               className={`transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`}
            />
         </Button>

         <AnimateExit
            hidden={isOpen}
            className='className="bg-primary-800 border-primary-600 outline-primary-600 outline-1" absolute inset-x-0 origin-top overflow-hidden rounded-sm'
         >
            {sortOptions.map(option => (
               <DropdownItem
                  key={option}
                  value={option}
                  selected={sortMethod === option}
                  onClick={() => handleSettingsChange(option)}
               />
            ))}
         </AnimateExit>
      </div>
   );
}

export default SortMenu;
