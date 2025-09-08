import { useState, useEffect } from 'react';
import SettingsContext from './SettingsContext';
import { initialSettings } from '@frontend/data/data';

import type {
   SettingsContext as SettingsContextType,
   Settings,
   Children,
} from '@frontend/data/types';

const SettingsProvider = ({ children }: Children) => {
   const contextValue = useSettings();
   return (
      <SettingsContext.Provider value={contextValue}>
         {children}
      </SettingsContext.Provider>
   );
};

const getSettings = (): Settings => {
   const settings = localStorage.getItem('settings');
   return settings ? JSON.parse(settings) : initialSettings;
};

const useSettings = () => {
   const [settings, setSettings] = useState(getSettings);

   useEffect(() => {
      localStorage.setItem('settings', JSON.stringify(settings));
   }, [settings]);

   const updateSetting: SettingsContextType['updateSetting'] = (key, value) => {
      setSettings(prevSettings => ({ ...prevSettings, [key]: value }));
   };

   return { settings, updateSetting };
};

export default SettingsProvider;
