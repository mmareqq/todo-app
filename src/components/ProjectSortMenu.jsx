import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronIcon } from '../assets/Icons';

import DropdownItem from './DropdownItem';
import Button from './Button';

function ProjectSortMenu({ updateSettings, sortMethod }) {
   const [isOpen, setIsOpen] = useState(false);
   const sortOptions = ['priority', 'duration', 'name'];
   return (
      <div className="relative z-10">
         <Button
            variant="dropdown"
            className="flex items-center p-1"
            onClick={() => setIsOpen(p => !p)}
         >
            <span>Sort By</span>
            <ChevronIcon
               width="20"
               height="20"
               className={`transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`}
            />
         </Button>

         <AnimatePresence>
            {isOpen && (
               <motion.div
                  transition={{
                     duration: 0.1,
                     ease: 'easeOut',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="bg-primary-800 border-primary-600 outline-primary-600 absolute inset-x-0 origin-top overflow-hidden rounded-sm outline-1"
               >
                  {sortOptions.map(option => (
                     <DropdownItem
                        key={option}
                        selected={sortMethod === option}
                        onClick={() => {
                           updateSettings('sortMethod', option);
                           setIsOpen(false);
                        }}
                        value={option}
                     />
                  ))}
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}

export default ProjectSortMenu;
