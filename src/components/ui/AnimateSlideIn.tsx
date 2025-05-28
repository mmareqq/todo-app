import { motion } from 'motion/react';
import type { Children } from '@data/types';

type Props = {
   delayMS: number;
} & Children;

const AnimateSlideIn = ({ delayMS, children }: Props) => {
   return (
      <motion.div
         initial={{ opacity: 0, translate: '-30%' }}
         animate={{ opacity: 1, translate: '0' }}
         transition={{ delay: delayMS }}
      >
         {children}
      </motion.div>
   );
};

export default AnimateSlideIn;
