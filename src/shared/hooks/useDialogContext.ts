import { useContext } from 'react';
import DialogContext from '@contexts/DialogContext';

const useDialogContext = () => {
   const context = useContext(DialogContext);
   if (!context) throw new Error('no dialog context');
   return context;
};

export default useDialogContext;
