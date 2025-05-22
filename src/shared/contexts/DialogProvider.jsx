import { useState } from 'react';
import DialogContext from './DialogContext';

const DialogProvider = ({ children }) => {
   const dialog = useDialog();
   return (
      <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>
   );
};

const useDialog = () => {
   const [isOpen, setIsOpen] = useState(false);

   const openDialog = () => setIsOpen(true);
   const closeDialog = () => setIsOpen(false);

   return { isOpen, openDialog, closeDialog };
};

export default DialogProvider;
