import { motion } from 'motion/react';

const AnimateSlideIn = ({ delay, children }) => {
   return (
      <motion.div
         initial={{ opacity: 0, translate: '-30%' }}
         animate={{ opacity: 1, translate: '0' }}
         transition={{ delay: delay }}
      >
         {children}
      </motion.div>
   );
};

export default AnimateSlideIn;
