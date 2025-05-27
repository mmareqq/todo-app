import { useContext } from 'react';
import SettingsContext from '@contexts/SettingsContext';

const useSettingsContext = () => {
   const context = useContext(SettingsContext);
   if (!context) throw new Error('no dialog context');
   return context;
};

export default useSettingsContext;
