import type { Dialog, Children } from '@frontend/data/types';
import { useState } from 'react';

import DialogContext from './DialogContext';

const DialogProvider = ({ children }: Children) => {
   const contextValue = useDialog();
   return (
      <DialogContext.Provider value={contextValue}>
         {children}
      </DialogContext.Provider>
   );
};

const useDialog = (): Dialog => {
   const [isOpen, setIsOpen] = useState(false);

   const openDialog = () => setIsOpen(true);
   const closeDialog = () => setIsOpen(false);

   return { isOpen, openDialog, closeDialog };
};

export default DialogProvider;
