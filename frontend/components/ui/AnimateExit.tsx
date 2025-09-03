import { AnimatePresence, motion } from 'motion/react';
import type { Children } from '@data/types';

type Props = {
   hidden: boolean;
   className?: string;
} & Children;

function AnimateExit({ hidden, className, children }: Props) {
   return (
      <AnimatePresence>
         {hidden && (
            <motion.div
               transition={{
                  duration: 0.1,
                  ease: 'easeOut',
               }}
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ opacity: 0, scale: 0 }}
               className={className}
            >
               {children}
            </motion.div>
         )}
      </AnimatePresence>
   );
}

export default AnimateExit;
