import { useState } from 'react';
import { HourGlassIcon } from '../assets/Icons';
import { Chevron } from '../assets/Icons';
import { AnimatePresence, motion } from 'motion/react';

import DropdownItem from './DropdownItem';
import EditProjectButton from './EditProjectButton';
import Button from './Button';

function ProjectHeader({
   project,
   editProject,
   tasksDuration,
   updateSettings,
   sortMethod,
}) {
   const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
   const sortOptions = ['priority', 'duration', 'name'];

   return (
      <div>
         <div className="border-primary-500 flex items-end justify-between border-b-1 py-2">
            <h2 className="pt-4 text-2xl">{project.name}</h2>
            <EditProjectButton
               editProject={editProject}
               project={project}
            ></EditProjectButton>
         </div>
         <div className="flex items-center justify-between">
            <div className="my-6 flex items-center gap-1 text-sm">
               <div>
                  <HourGlassIcon />
               </div>
               <div>
                  <span>Total Duration: </span>
                  {tasksDuration}
               </div>
            </div>
            <div className="relative z-10">
               <div>
                  <Button
                     variant="dropdown"
                     className="flex items-center gap-1"
                     onClick={() => setIsSortMenuOpen(p => !p)}
                  >
                     <span>Sort By</span>
                     <Chevron
                        width="20"
                        height="20"
                        className={`transition-transform duration-250 ${!isSortMenuOpen ? 'rotate-180' : ''}`}
                     />
                  </Button>
               </div>
               <AnimatePresence>
                  {isSortMenuOpen && (
                     <motion.div
                        transition={{
                           duration: 0.1,
                           ease: 'linear',
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
                                 setIsSortMenuOpen(false);
                              }}
                              value={option}
                           />
                        ))}
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </div>
      </div>
   );
}
export default ProjectHeader;
