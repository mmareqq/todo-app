import { useContext } from 'react';
import DialogContext from '@contexts/DialogContext';

const useDialogContext = () => {
   if (!DialogContext) throw new Error('no dialog context');
   return useContext(DialogContext);
};

export default useDialogContext;
