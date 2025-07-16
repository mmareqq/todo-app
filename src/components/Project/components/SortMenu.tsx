import { useState } from 'react';
import { ChevronIcon } from '@assets/Icons';

import AnimateExit from '@ui/AnimateExit';
import DropdownItem from '@ui/DropdownItem';
import Button from '@ui/Button';
import type { SortMethod } from '@data/types';

const SortMenu = () => {
   const [isOpen, setIsOpen] = useState(false);
   const sortOptions: SortMethod[] = ['priority', 'duration', 'name'];

   const toggleOpen = () => setIsOpen((p) => !p);

   return (
      <div className="relative z-10">
         <Button
            variant="dropdown"
            className="flex items-center gap-1 pr-1.5"
            onClick={toggleOpen}
         >
            <span>Sort By</span>
            <ChevronIcon
               size={20}
               className={`transition-transform duration-250 ${isOpen ? '' : 'rotate-180'}`}
            />
         </Button>

         <AnimateExit
            hidden={isOpen}
            className='className="bg-primary-800 border-primary-600 outline-primary-600 outline-1" absolute inset-x-0 origin-top overflow-hidden rounded-sm'
         >
            {sortOptions.map((option) => (
               <DropdownItem key={option} value={option} close={toggleOpen} />
            ))}
         </AnimateExit>
      </div>
   );
};

export default SortMenu;
