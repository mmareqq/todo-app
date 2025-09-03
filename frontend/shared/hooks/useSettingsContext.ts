import { useContext } from 'react';
import SettingsContext from '@contexts/SettingsContext';

const useSettingsContext = () => {
   const context = useContext(SettingsContext);
   if (!context) {
      throw new Error(
         'SettingsContext not found. Prob the component is not wrapped in Provider',
      );
   }

   return context;
};

export default useSettingsContext;
