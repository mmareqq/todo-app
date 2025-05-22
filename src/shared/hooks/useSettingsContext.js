import { useContext } from 'react';
import settingsContext from '@contexts/SettingsContext';

const useSettingsContext = () => {
   if (!settingsContext) throw new Error('no settings context');
   return useContext(settingsContext);
};

export default useSettingsContext;
